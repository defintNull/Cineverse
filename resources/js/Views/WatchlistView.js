import { Movie } from "../Models/Movie";
import { MovieDBService } from "../Services/MovieDBService";
import { View } from "./View";
import { RenameButton } from "../Components/RenameButton.js";
import { Input } from "../Components/Input.js";
import { DeleteButton } from "../Components/DeleteButton.js";
import { ExitButton } from "../Components/exitButton.js";


export class WatchlistView extends View {
    #renameButton;
    #inputComponent;
    #delete_button;
    #remove_button;

    constructor() {
        super();
        this.#renameButton = new RenameButton();
        this.#inputComponent = new Input();
        this.#delete_button = new DeleteButton();
        this.#remove_button = new ExitButton();
    }

    // Load layout of the page
    render() {
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
            "shadow",
            'cursor-pointer',
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

        // --- HEADER ben visibile ---
        // Creo l'header
        const header = document.createElement("header");
        header.id = "watchlist_header";
        header.className = "flex items-center justify-between gap-4";

        let dati = document.createElement("form");
        dati.id = "rename_form";
        dati.className = "flex flex-row items-start justify-center h-full gap-x-4";

        let input_container = document.createElement("div");
        input_container.className = "flex flex-row items-center";

        // Titolo
        const title = document.createElement("h1");
        title.id = `watchlist_title`;
        title.className = "text-2xl sm:text-3xl font-bold text-gray-900 text-white";
        input_container.appendChild(title);

        // Change name input
        let rename_input = this.#inputComponent.getComponentElement();
        rename_input.classList.add("hidden", "min-w-60");
        rename_input.querySelector("label").remove();
        rename_input.querySelector("input").id = "rename_watchlist_input";
        rename_input.querySelector("input").type = "text";
        rename_input.querySelector("input").name = "rename_watchlist";
        rename_input.querySelector("input").placeholder = "Insert new name";
        input_container.appendChild(rename_input);

        dati.appendChild(input_container);

        // Bottone
        const renameButton = this.#renameButton.getComponentElement();
        renameButton.classList.add("hidden");
        dati.appendChild(renameButton);

        // Input to store watchlist id
        let input = document.createElement("input");
        input.type = "text";
        input.name = "watchlist_id";
        input.hidden = true;

        // Delete button
        let delete_button = this.#delete_button.getComponentElement();
        delete_button.id = "delete_watchlist_button";
        delete_button.innerText = "Delete";

        // Assemblo
        header.appendChild(dati);
        header.appendChild(input);
        header.appendChild(delete_button);

        // Ora puoi appenderlo dove serve, ad esempio:
        main.appendChild(header);

        // Container principale
        const grid_container = document.createElement("div");
        grid_container.id = "watchlist_grid_container";
        grid_container.className = "flex flex-col p-6 min-h-[calc(100vh-4rem)] box-border";

        // --- GRID ---
        const grid = document.createElement("div");
        grid.id = "watchlist_grid";
        grid.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start content-start";
        grid_container.appendChild(grid);

        main.appendChild(grid_container);

        container.appendChild(main);

        // Append al DOM
        document.body.querySelector("main").appendChild(container);
    }

    // Clear the view and remove the document event listeners
    clearView() {
        document.body.querySelector("main").innerHTML = "";
    }

    // Populate whe left sidebar with the watchlists
    async populateWatchlistsLayout(watchlistsfunc) {
        let watchlists = await watchlistsfunc();

        const list = document.getElementById("watchlist_list");
        list.classList.add("space-y-2");

        // Creo gli <li> per ogni watchlist
        const items = watchlists.map(w => {
            const li = document.createElement("li");
            li.classList.add(
                "bg-gray-700",
                "watchlist-card",
                "rounded",
                "p-3",
                "cursor-pointer",
                "hover:bg-gray-600",
                "transition"
            );
            li.innerText = w.getName();
            li.dataset.watchlistId = w.getId();
            li.dataset.elements = w.contentToJson();
            list.appendChild(li);
            return { element: li, data: w };
        });

        // Click first li item
        document.getElementById("watchlist_list").querySelector("li").click();

        // Ritorno i riferimenti per l'uso in addEventListeners
        return { items };
    }

    async #addWatchlistGridElements(items) {
        const grid = document.getElementById("watchlist_grid");

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
                "relative",
            );

            // Aggiungo la classe specifica in base al tipo
            if (item instanceof Movie) {
                card.classList.add("movie-card");
            } else {
                card.classList.add("serie-card");
            }

            let remove_element_button = this.#remove_button.getComponentElement();
            remove_element_button.classList.remove("top-8", "left-8", "dark:hover:bg-gray-700", "hover:bg-gray-200");
            remove_element_button.classList.add("top-2", "right-2", "remove-button", "hidden", "hover:bg-gray-500");
            card.appendChild(remove_element_button);

            // ID nascosto
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.value = item.getId();
            card.appendChild(hiddenInput);

            // Poster
            const img = document.createElement("img");
            img.src = MovieDBService.getImageSrc("w780", item.getPosterImageSrc());
            img.alt = item.getTitle();
            img.classList.add("w-full", "h-64", "object-cover");
            card.appendChild(img);

            grid.appendChild(card);
        });
    }




    async addEventListeners(
        getWatchlistContentCallback,
        createnewwatchlistCallback,
        movie_click_callback,
        serie_click_callback,
        renameWatchlistcallback,
        deleteWatchlistCallback,
        removeElementCallback,
    ) {
        const main = this;

        // Click Event watchlist
        document.getElementById("watchlist_list").addEventListener("click", async function(event) {
            const watchlist_card = event.target.closest(".watchlist-card");
            if(watchlist_card && this.contains(watchlist_card)) {
                let content = await getWatchlistContentCallback(JSON.parse(watchlist_card.dataset.elements));

                // Pulizia griglia
                document.getElementById("watchlist_grid").innerHTML = "";

                // Setting header
                let header = document.getElementById("watchlist_header");
                header.querySelector("input[name='watchlist_id']").value = watchlist_card.dataset.watchlistId;
                document.getElementById("watchlist_title").innerText = watchlist_card.innerText;
                header.querySelector("input[name='rename_watchlist']").value = watchlist_card.innerText;
                header.querySelector("button").classList.remove("hidden");

                if(!content || content.length === 0) {
                    const emptyMsg = document.createElement("p");
                    emptyMsg.classList.add("text-gray-400", "italic", "p-4");
                    emptyMsg.innerText = "Nessun contenuto in questa watchlist.";
                    document.getElementById("watchlist_grid").appendChild(emptyMsg);
                } else {
                    main.#addWatchlistGridElements(content);
                }
            }
        });

        //BOTTONE AGGIUNGI WATCHLIST
        document.getElementById("add_watchlist_btn").addEventListener("click", async function() {
            //mi salvo la watchlist di base
            let watchlistdb = await createnewwatchlistCallback();

            const newItem = document.createElement("li");
            newItem.classList.add(
                "bg-gray-700",
                "rounded",
                "p-3",
                "cursor-pointer",
                "hover:bg-gray-600",
                "transition",
                "watchlist-card"
            );
            newItem.innerText = watchlistdb.getName();
            newItem.dataset.watchlistId = watchlistdb.getId();
            newItem.dataset.elements = watchlistdb.contentToJson();

            // Inserisco come primo elemento della lista esistente
            document.getElementById("watchlist_list").prepend(newItem);
            newItem.click();

        });

        /**
         * Adding click event listeners for movies and series cards and delete
         */
        document.getElementById("watchlist_grid").addEventListener("click", async function(event) {
            const remove_button = event.target.closest(".remove-button");
            if (remove_button && document.body.contains(remove_button)) {
                event.stopPropagation();
                let type = null;
                remove_button.parentElement.classList.contains("movie-card") ? type = "Movie" : type = "Serie";
                let element_id = remove_button.parentElement.querySelector("input").value;

                let res = await removeElementCallback(document.getElementById("watchlist_header").querySelector("input[name='watchlist_id']").value, type, element_id);

                if(res == 200) {
                    remove_button.parentElement.remove();
                }

                return;
            }

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
        });

        /**
         * Enable the rename field
         */
        document.getElementById("rename_button").addEventListener("click", function(event) {
            let header = document.getElementById("watchlist_header");

            header.querySelector("p.error-field").innerText = "";
            if(document.getElementById("watchlist_title").classList.contains("hidden")) {
                document.getElementById("rename_watchlist_input").parentElement.classList.add("hidden");
                document.getElementById("rename_watchlist_input").value = document.getElementById("watchlist_title").innerText;
                document.getElementById("watchlist_title").classList.remove("hidden");
            } else {
                document.getElementById("watchlist_title").classList.add("hidden");
                document.getElementById("rename_watchlist_input").parentElement.classList.remove("hidden");
            }
        });

        /**
         * Rename a watchlist
         */
        document.getElementById("rename_form").addEventListener("submit", async function(event) {
            event.preventDefault()
            this.querySelector("p.error-field").innerText = "";

            let watchlist = await renameWatchlistcallback(this.parentElement.querySelector("input[name='watchlist_id']").value, this.querySelector("input").value);
            if(watchlist == 400) {
                this.querySelector("p.error-field").innerText = "Something went wrong!";
            } else {
                document.getElementById("watchlist_list").querySelector("li[data-watchlist-id='" + this.parentElement.querySelector("input[name='watchlist_id']").value + "'").innerText = watchlist.getName();
                document.getElementById("rename_watchlist_input").parentElement.classList.add("hidden");
                document.getElementById("watchlist_title").innerText = watchlist.getName();
                document.getElementById("watchlist_title").classList.remove("hidden");
            }
        });

        /**
         * Delete a watchlist
         */
        document.getElementById("delete_watchlist_button").addEventListener("click", async function(event) {
            let watchlist_id = document.getElementById("watchlist_header").querySelector("input[name='watchlist_id']").value;
            let res = await deleteWatchlistCallback(watchlist_id);

            if(res == 200) {
                console.log('Ciao');
                document.getElementById("watchlist_list").querySelector("li[data-watchlist-id='" + watchlist_id + "'").remove();
                document.getElementById("watchlist_list").querySelector("li").click();
            }
        });

        // Remove button over events
        document.getElementById("watchlist_grid_container").addEventListener("mouseover", function(event) {
            const card = event.target.closest(".movie-card, .serie-card");
            if (card && document.body.contains(card)) {
                card.querySelector(".remove-button").classList.remove("hidden");
            }
        });
        document.getElementById("watchlist_grid_container").addEventListener("mouseout", function(event) {
            const card = event.target.closest(".movie-card, .serie-card");
            if (card && document.body.contains(card)) {
                card.querySelector(".remove-button").classList.add("hidden");
            }
        });
    }

}
