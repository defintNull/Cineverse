import { AddButton } from "../Components/AddButton";
import { NavigatorElement } from "../Components/NavigatorElement";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { MovieDBService } from "../Services/MovieDBService";
import { View } from "./View";
import Watchlist from "../Models/Watchlist.js";


export class WatchlistView extends View {
    #element;
    #bgImage;
    #navigator;
    #addButton;
    #clickHandle


    constructor() {
        super();
        this.#navigator = new NavigatorElement();
        this.#addButton = new AddButton();
    }


    render(watchlistshandler,movies) {
        this.createWatchlistsLayout();
    }

    addEventListeners(refs, watchlistsWithMovies, createnewwatchlistfunc) {
        const main = document.getElementById("watchlist_main");
        const list = document.getElementById("watchlist_list2");//da fixare ci dovrebbe essere una watchlist sola
        // Listener unico sul contenitore
        list.addEventListener("click", (e) => {
            // Verifico che il target sia un LI
            const li = e.target.closest("li");
            if (!li || !list.contains(li)) return;

            // Recupero i dati dal dataset
            const watchlistId = li.dataset.watchlistId;
            if (!watchlistId) return;

            // Rimuovo eventuale griglia precedente
            document.getElementById("watchlist_grid")?.remove();

            // Trovo la watchlist corrispondente
            const match = watchlistsWithMovies.find(w => w.watchlist.id == watchlistId);
            if (match) {
                // Ricreo la struttura base della griglia
                const grid = this.addWatchlistGrid(match.watchlist);
                main.appendChild(grid);

                // Popolo i film
                this.renderMovies(match.movies, match.watchlist);
            }
        });
        //BOTTONE AGGIUNGI WATCHLIST
        const addButton = document.getElementById("add_watchlist_btn");
        if (addButton) {
            addButton.addEventListener("click", () => {
                // Recupero la UL già esistente
                const watchlistContainer = document.getElementById("watchlist_list2");
                //Ho la necessità di creare un oggetto watchlist per passarlo
                const newWatchlist = {
                "name": "New Watchlist"
                };
                //mi salvo la watchlist di base
                let watchlistdb = createnewwatchlistfunc(newWatchlist); //chiamo la funzione del controller per salvare nel db
                const newItem = document.createElement("li");
                newItem.classList.add(
                    "bg-gray-700",
                    "rounded",
                    "p-3",
                    "cursor-pointer",
                    "hover:bg-gray-600",
                    "transition"
                );
                newItem.innerText = "Nuova Watchlist";
                newItem.dataset.watchlistId = Date.now();

                // Inserisco come primo elemento della lista esistente
                //list.prepend(newItem);
                watchlistContainer.prepend(newItem);

                console.log("Nuova watchlist aggiunta!");
            });
        }

        // Handle click function
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

    }

    removeDocumentEventListeners() {
        //document.removeEventListener("click", this.#clickHandle);
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
    sidebarTitle.innerText = "Le tue watchlist";

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



    /* async populateWatchlistsLayout(watchlistsfunc) {
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

        // Creo gli <li> ma NON aggiungo ancora i listener
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
            li.dataset.watchlistId = w.id; // salvo un riferimento utile
            list.appendChild(li);
            return { element: li, data: w };
        });
        sidebar.appendChild(list);

        // Mostro di default la prima watchlist
        if (watchlists.length > 0) {
            const grid = this.addWatchlistGrid(watchlists[0]);
            main.appendChild(grid);
        }
        // Ritorno i riferimenti per l'uso in addEventListeners
        return { items, main };
    } */
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
        li.dataset.watchlistId = w.id; // salvo un riferimento utile
        list.appendChild(li);
        return { element: li, data: w };
    });

    sidebar.appendChild(list);

    // Mostro di default la prima watchlist
    if (watchlists.length > 0) {
        const grid = this.addWatchlistGrid(watchlists[0]);
        main.appendChild(grid);

        // Qui puoi già renderizzare i contenuti perché watchlistsfunc li ha forniti
        if (Array.isArray(watchlists[0].items) && watchlists[0].items.length > 0) {
            this.renderItems(watchlists[0].items, watchlists[0].watchlist ?? watchlists[0]);
        }
    }

    // Ritorno i riferimenti per l'uso in addEventListeners
    return { items, main };
}




addWatchlistGrid(watchlist) {
    // Container griglia
    const grid_container = document.createElement("div");
    grid_container.id = "watchlist_grid";
    grid_container.classList.add(
        "flex",
        "flex-col",
        "p-6",
        "min-h-[calc(100vh-4rem)]", // altezza minima stabile
        "box-border"
    );

    // Titolo
    const title = document.createElement("h1");
    title.classList.add("text-2xl", "font-bold", "mb-6");
    title.innerText = "" + watchlist.name; //non serve inserire un "titolo watchlist" perchè c'è già il nome della watchlist
    grid_container.appendChild(title);

    // Griglia (vuota, verrà popolata dopo)
    const grid = document.createElement("div");
    grid.classList.add(
        "grid",
        "grid-cols-2",
        "sm:grid-cols-3",
        "md:grid-cols-4",
        "lg:grid-cols-5",
        "gap-6",
        "items-start",
        "content-start"
    );

    // Se la watchlist è vuota → placeholder elegante

    if (!watchlist.movies || watchlist.movies.length === 0) {
        const placeholder = document.createElement("div");
        placeholder.classList.add(
            "col-span-full",          // occupa tutta la riga
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "text-gray-400",
            "italic",
            "p-12",
            "border-2",
            "border-dashed",
            "border-gray-600",
            "rounded-lg",
            "h-[450px]"
        );

        const icon = document.createElement("span");
        icon.innerText = "🎬"; // icona film
        icon.classList.add("text-5xl", "mb-4");

        const msg = document.createElement("p");
        msg.innerText = "Nessun film in questa watchlist";
        msg.classList.add("text-lg");

        placeholder.appendChild(icon);
        placeholder.appendChild(msg);
        grid.appendChild(placeholder);
    }

    grid_container.appendChild(grid);
    return grid_container;
}

    async renderMovies(movies) {
    this.addWatchlistGridElements(movies);
    }

async addWatchlistGridElements(items) {
    const grid = document.getElementById("watchlist_grid").querySelector("div");
    grid.innerHTML = ""; // resetto sempre il contenuto

    // Caso watchlist vuota
    if (!items || items.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.classList.add("text-gray-400", "italic", "p-4");
        emptyMsg.innerText = "Nessun contenuto in questa watchlist.";
        grid.appendChild(emptyMsg);
        return;
    }

    // Caso watchlist con contenuti (film o serie)
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
            "duration-200",
            "h-[250px]"
        );

        // Aggiungo la classe specifica in base al tipo
        if (item.title) {
            // I film di TMDB hanno la proprietà "title"
            card.classList.add("movie-card");
        } else if (item.name) {
            // Le serie hanno la proprietà "name"
            card.classList.add("serie-card");
        }

        // Poster
        const img = document.createElement("img");
        img.src = MovieDBService.getImageSrc("w780", item.poster_path);
        img.alt = item.title || item.name;
        img.classList.add("w-full", "h-64", "object-cover");
        card.appendChild(img);

        // Info
        const info = document.createElement("div");
        info.classList.add("p-3");

        const title = document.createElement("h3");
        title.classList.add("text-lg", "font-semibold");
        title.innerText = item.title || item.name;

        const extra = document.createElement("p");
        extra.classList.add("text-gray-400", "text-sm");
        if (item.runtime) {
            extra.innerText = `${item.runtime} min`;
        } else if (item.number_of_seasons) {
            extra.innerText = `${item.number_of_seasons} stagioni`;
        }

        info.appendChild(title);
        info.appendChild(extra);
        card.appendChild(info);

        grid.appendChild(card);
    });
}
    /* async addWatchlistGridElements(movies) {
        const grid = document.getElementById("watchlist_grid").querySelector("div");
        grid.innerHTML = ""; // resetto sempre il contenuto

        // Caso watchlist vuota
        if (!movies || movies.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.classList.add("text-gray-400", "italic", "p-4");
            emptyMsg.innerText = "Nessun film in questa watchlist.";
            grid.appendChild(emptyMsg);
            return;
        }

        // Caso watchlist con film
        movies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add(
                "bg-gray-800",
                "rounded-lg",
                "overflow-hidden",
                "shadow-lg",
                "cursor-pointer",
                "hover:scale-105",
                "transition",
                "duration-200",
                "h-[250px]"
            );

            // Poster
            const img = document.createElement("img");
            img.src = MovieDBService.getImageSrc("w780", movie.poster_path);
            img.alt = movie.title;
            img.classList.add("w-full", "h-64", "object-cover");
            card.appendChild(img);

            grid.appendChild(card);
        });
    } */


}
