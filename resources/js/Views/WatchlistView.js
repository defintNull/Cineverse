import { AddButton } from "../Components/AddButton";
import { NavigatorElement } from "../Components/NavigatorElement";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { MovieDBService } from "../Services/MovieDBService";
import { View } from "./View";
import Watchlist from "../Models/Watchlistbis.js";


export class WatchlistView extends View {
    #element;
    #bgImage;
    #navigator;
    #addButton;
    #clickHandle;
    currentWatchlist = null;
    #clickbuttonhandle;
    #clickmainhandle;

    constructor() {
        super();
        this.#navigator = new NavigatorElement();
        this.#addButton = new AddButton();
    }

    render(watchlistshandler,movies) {
        this.createWatchlistsLayout();
    }

    async addEventListeners(
        refs,
        watchlistsWithContent,
        createnewwatchlistfunc,
        movie_click_callback,
        serie_click_callback,
        updatewatchlistfunc
    ) {
        const main = document.getElementById("watchlist_main");
        const list = document.getElementById("watchlist_list2");
        const master = this;
        // dentro la tua classe
        this.#clickmainhandle = function(event) {
            //const main = document.getElementById("watchlist_main");
            //const list = document.getElementById("watchlist_list2");
            // CLICK DELLE WATCHLIST
            const li = event.target.closest("li");
            console.log("li trovata", li);
            if (!li || !list.contains(li)) return;

            // Recupero i dati dal dataset
            const watchlistId = li.dataset.watchlistId;
            if (!watchlistId) return;

            // Rimuovo eventuale griglia precedente
            document.getElementById("watchlist_grid")?.remove();

            //console.log("watchlistsWithContent", this.watchlistsWithContent);

            const match = watchlistsWithContent.find(w => w.watchlist.id == watchlistId);

            if (match) {
                // Memorizzo la watchlist corrente
                master.currentWatchlist = match.watchlist;
                //console.log("Watchlist corrente:", this.currentWatchlist);

                // Ricreo la struttura base della griglia
                const grid = master.addWatchlistGrid(match.watchlist);
                main.appendChild(grid);

                // Popolo i contenuti (film + serie)
                master.renderItems(match.items, match.watchlist);
            }
        };

        // e poi nel costruttore o nell’inizializzazione:
        //this.list.addEventListener("click", this.#clickmainhandle);
        document.addEventListener("click", this.#clickmainhandle);

        //BOTTONE AGGIUNGI WATCHLIST
        const addButton = document.getElementById("add_watchlist_btn");
        if (addButton) {
            addButton.addEventListener("click", async function() {
                // Recupero la UL già esistente


                const watchlistContainer = document.getElementById("watchlist_list2");
                //Ho la necessità di creare un oggetto watchlist per passarlo
                let newWatchlist = {
                "name": "New Watchlist"
                };
                //mi salvo la watchlist di base
                let watchlistdb = await createnewwatchlistfunc(newWatchlist,watchlistsWithContent); //chiamo la funzione del controller per salvare nel db
                //console.log("  aa ",watchlistdb.id);           //  è UNA PROMISEEEEEE
                //newWatchlist["content"] = [];
                //newWatchlist["id"] = watchlistdb;
                //potrei rilanciare il metodo get all


                const newItem = document.createElement("li");
                newItem.classList.add(
                    "bg-gray-700",
                    "rounded",
                    "p-3",
                    "cursor-pointer",
                    "hover:bg-gray-600",
                    "transition"
                );
                newItem.innerText = "New Watchlist";
                newItem.id = `watchlist-${watchlistdb.id}`;
                newItem.dataset.watchlistId = watchlistdb.id;
                //newItem.dataset.watchlistId = Date.now();

                // Inserisco come primo elemento della lista esistente
                //list.prepend(newItem);
                watchlistContainer.prepend(newItem);
                //watchlistsWithContent.push(watchlistdb);
                //const id = li.dataset.watchlistId;
                newItem.click();

            });
        }

        // Handle click function
        // Qui implemento il click per la schermata di dettaglio film/serie
        this.#clickHandle = function(event) {
            //devo aggiungere queste classi, movie-card e serie-card, alle card dei film e delle serie
            const card = event.target.closest(".movie-card, .serie-card");

            if (card && document.body.contains(card)) {
                const input = card.querySelector("input");
                if (!input) return;

                const id = input.value;

                if (card.classList.contains("movie-card")) {
                    /**
                     * Adding click events for movies
                     */
                    movie_click_callback(id);
                } else if (card.classList.contains("serie-card")) {
                    /**
                     * Adding click event for series
                     */
                    serie_click_callback(id);
                }
            }
        }

        /**
         * Adding click event listeners for movies and series cards
         */
        document.addEventListener("click", this.#clickHandle);

        this.#clickbuttonhandle = function(event) {
            //devo aggiungere queste classi, movie-card e serie-card, alle card dei film e delle serie
            const button = event.target.closest(".renamebutton");

            if (button && document.body.contains(button)) {
                //const input = card.querySelector("input");
                //posso usare il dataset del bottone
                //METTO IL RESTO DEL CODICE
                let id = button.dataset.watchlistId;
                //Visto che ora gli Id sono parametrici posso prendermi tutti gli elementi associati che voglio
                const watchlist_title = document.getElementById("title-" + id);

                let input = "Renamed Watchlist";  //                   DA CAMBIARE
                //const id = button.dataset.watchlistId;
                console.log("id dal dataset del bottone", id);
                //TROPPO A CASO questa query
                //const items = document.querySelectorAll("#watchlist_list2 li");

                const li = document.getElementById(`watchlist-${id}`);

                li.innerHTML = input;
                //non mi serve cercare così

                //da vedere come fixare al volo qua
                const wl = watchlistsWithContent.find(
                            item => String(item.watchlist.id) === String(id)
                            ) || null;
                console.log("search",watchlistsWithContent[id]);
                wl.watchlist.name = input;
                //RENAME NELLA STRUTTURA DATI, MA VA COMUNQUE
                //RIRENDERIZZATA LA WATCHLIST LIST Oppure si cambia il campo specifico
                //PROBABILMENTE è L'opzione MIGLIORE
                //ALLA creazione dell'elemento della watchlist si mette nel dataset anche l'id
                //console.log("Watchlist trovata per rename:", wl);

                //const newName = prompt("Nuovo nome della watchlist:", "wl.name");


/*                     if (input && input.trim() !== "") {
                        // aggiorno l’oggetto in memoria
                        wl.name = input.trim();

                        // aggiorno il titolo nel DOM
                        //const watchlist_title = document.getElementById("watchlist_title");
                        //Ho la necessità di creare un oggetto watchlist per passarlo

                        watchlist_title.innerHTML = input;
                        // salvo sul DB
                        //saveWatchlist(wl);
                    } */


                //INPUT HARDCODATO per ora

                //MI DEVO PRENDERE LA WATCHLIST CORRENTE
                const match = watchlistsWithContent.find(w => w.watchlist.id == id);
                this.currentWatchlist = match.watchlist;
                const renamingwatchlist = match.watchlist;
                //console.log("Watchlist da rinominare:", renamingwatchlist);
                renamingwatchlist.name = input;  //ERRORE QUA
                let watchlistdb = updatewatchlistfunc(renamingwatchlist); //chiamo la funzione del controller per salvare nel db

                // Inserisco come primo elemento della lista esistente
                //list.prepend(newItem);
                //watchlistContainer.prepend(newItem);

                //console.log("Nuova watchlist aggiunta!");

/*                 if (!input) return;

                const id = input.value;

                if (card.classList.contains("movie-card")) {

                     //Adding click events for movies

                    movie_click_callback(id);
                } else if (card.classList.contains("serie-card")) {

                    Adding click event for series

                    serie_click_callback(id);
                }
                */
            }
        }

        document.addEventListener("click", this.#clickbuttonhandle);



    }

    removeDocumentEventListeners() {
        document.removeEventListener("click", this.#clickHandle);
    }


    //step 1)crea il layout di base chiamato da render e sincrono
    //NULLA DA CAMBIARE QUI
    createWatchlistsLayout() {
    // Root container con grid
    const container = document.createElement("div");
    container.id = "watchlists_layout";
    container.classList.add(
        "grid",
        "grid-cols-8",
        "min-h-screen",
        "bg-gray-900",
        "text-white",
        "w-full"
    );

    // Sidebar
    const sidebar = document.createElement("aside");
    sidebar.id = "watchlist_sidebar";
    sidebar.classList.add(
        "bg-gray-800",
        "p-4",
        "overflow-y-auto",
        "col-span-2",
        "flex",
        "flex-col"
    );

    // Header della sidebar con titolo + bottone
    const sidebarHeader = document.createElement("div");
    sidebarHeader.classList.add("flex", "items-center", "justify-between", "mb-4");

    const sidebarTitle = document.createElement("h2");
    sidebarTitle.classList.add("text-lg", "font-bold");
    sidebarTitle.innerText = "Your watchlists";

    const addButton = document.createElement("button");
    addButton.id = "add_watchlist_btn";
    addButton.innerText = "+";
    addButton.classList.add(
        "bg-blue-600",
        "hover:bg-blue-700",
        "text-white",
        "font-bold",
        "w-8",
        "h-8",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "shadow"
    );

    sidebarHeader.appendChild(sidebarTitle);
    sidebarHeader.appendChild(addButton);
    sidebar.appendChild(sidebarHeader);

    // Qui verranno aggiunte le watchlist
    const watchlistContainer = document.createElement("ul");
    watchlistContainer.id = "watchlist_list";
    watchlistContainer.classList.add("space-y-2");
    sidebar.appendChild(watchlistContainer);

    container.appendChild(sidebar);

    // Main content
    const main = document.createElement("div");
    main.id = "watchlist_main";
    main.classList.add("flex", "col-start-3", "col-span-6", "flex-col", "p-6");
    container.appendChild(main);

    // Append al DOM
    document.body.querySelector("main").appendChild(container);
    }

    async populateWatchlistsLayout(watchlistsfunc) {
        let watchlists = await watchlistsfunc();
        const sidebar = document.getElementById("watchlist_sidebar");
        const main = document.getElementById("watchlist_main");

        if (!sidebar || !main) {
            console.error("La struttura non è stata ancora creata. Chiama createWatchlistsLayout() prima.");
            return;
        }

        const list = document.createElement("ul");
        list.id = "watchlist_list2";
        list.classList.add("space-y-2");

        // Creo gli <li> per ogni watchlist
        const items = watchlists.map(w => {
            const li = document.createElement("li");
            li.classList.add(
                "bg-gray-700",
                "rounded",
                "p-3",
                "cursor-pointer",
                "hover:bg-gray-600",
                "transition"
            );
            li.innerText = w.name;
            li.id = `watchlist-${w.id}`;
            li.dataset.watchlistId = w.id; // salvo un riferimento utile
            list.appendChild(li);
            return { element: li, data: w };
        });

        sidebar.appendChild(list);

        // Mostro di default la prima watchlist
        if (watchlists.length > 0) {
            const grid = this.addWatchlistGrid(watchlists[0]);
            main.appendChild(grid);
            //SALVO NELLA CLASSE
            this.currentWatchlist = watchlists[0];

            // Qui puoi già renderizzare i contenuti perché watchlistsfunc li ha forniti
            if (Array.isArray(watchlists[0].items) && watchlists[0].items.length > 0) {
                this.renderItems(watchlists[0].items, watchlists[0].watchlist ?? watchlists[0]);
            }
        }

        // Ritorno i riferimenti per l'uso in addEventListeners
        return { items, main };
    }



    //Questa genera la struttura a destra, prima di lanciare renderItems
    addWatchlistGrid(watchlist) {
        // Container principale
        const grid_container = document.createElement("div");
        grid_container.id = "watchlist_grid";
        grid_container.className = "flex flex-col p-6 min-h-[calc(100vh-4rem)] box-border";

        // --- HEADER ben visibile ---
        // Creo l'header
        const header = document.createElement("header");

        header.className = "flex items-center gap-4";

        // Titolo
        const title = document.createElement("h1");
        title.id = `title-${watchlist.id}`;
        title.className = "text-2xl sm:text-3xl font-bold text-gray-900 text-white";
        title.innerText = "" + watchlist.name; // qui puoi sostituire con watchlist.name o altro

        // Bottone
        const renameButton = document.createElement("button");
        renameButton.id =  `rename-${watchlist.id}`;
        renameButton.dataset.watchlistId = watchlist.id;

        renameButton.type = "button";
        renameButton.className = `
        renamebutton inline-flex items-center px-4 py-2 border border-transparent
        text-sm font-medium rounded-md shadow-sm
        bg-indigo-600 text-white hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        `;
        renameButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875
                    0 1 1 2.652 2.652L10.582 16.07a4.5 4.5
                    0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5
                    0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5
                    7.125M18 14v4.75A2.25 2.25 0 0 1 15.75
                    21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25
                    2.25 0 0 1 5.25 6H10" />
        </svg>
        `;

        // Assemblo
        header.appendChild(title);
        header.appendChild(renameButton);

        // Ora puoi appenderlo dove serve, ad esempio:
        grid_container.appendChild(header);

        // --- GRID ---
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start content-start";

        // Placeholder se vuota
        if (!watchlist.content || watchlist.content.length === 0) {
            const placeholder = document.createElement("div");
            placeholder.className = "col-span-full flex flex-col items-center justify-center text-gray-400 italic p-12 border-2 border-dashed border-gray-600 rounded-lg h-[300px]";
            placeholder.innerHTML = `
                <span class="text-5xl mb-4">🎬</span>
                <p class="text-lg">Nessun contenuto in questa watchlist</p>
            `;
            grid.appendChild(placeholder);
        }

        grid_container.appendChild(grid);
        return grid_container;
    }

    async renderItems(items) {
    this.addWatchlistGridElements(items);
    }

    async addWatchlistGridElements(items) {
        const grid = document.getElementById("watchlist_grid").querySelector("div");
        grid.innerHTML = "";

        if (!items || items.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.classList.add("text-gray-400", "italic", "p-4");
            emptyMsg.innerText = "Nessun contenuto in questa watchlist.";
            grid.appendChild(emptyMsg);
            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add(
                "bg-gray-800",
                "rounded-lg",
                "overflow-hidden",
                "shadow-lg",
                "cursor-pointer",
                "hover:scale-105",
                "transition",
                "duration-200"
            );

            // Aggiungo la classe specifica in base al tipo
            if (item.title) {
                card.classList.add("movie-card");
            } else if (item.name) {
                card.classList.add("serie-card");
            }

            // 🔹 ID nascosto
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.value = item.id;
            card.appendChild(hiddenInput);

            // Poster
            const img = document.createElement("img");
            img.src = MovieDBService.getImageSrc("w780", item.poster_path);
            img.alt = item.title || item.name;
            img.classList.add("w-full", "h-64", "object-cover");
            card.appendChild(img);

            grid.appendChild(card);
        });
    }

}
