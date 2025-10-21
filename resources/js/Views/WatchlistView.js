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



    constructor() {
        super();
        this.#navigator = new NavigatorElement();
        this.#addButton = new AddButton();
    }


    render(watchlistshandler,movies) {
        this.createWatchlistsLayout();
    }

    addEventListeners({ items, main }) {
        items.forEach(({ element, data }) => {
        element.addEventListener("click", () => {
            document.getElementById("watchlist_grid")?.remove();
            const grid = this.addWatchlistGrid(data);
            main.appendChild(grid);
        });
    });

    }

    //step 1)crea il layout di base chiamato da render e sincrono
    createWatchlistsLayout() {
        // Root container con flex row
        const container = document.createElement("div");
        container.id = "watchlists_layout";
        container.classList.add("flex", "flex-row", "min-h-screen", "bg-gray-900", "text-white");

        // Sidebar (vuota, verrà popolata dopo)
        const sidebar = document.createElement("aside");
        sidebar.id = "watchlist_sidebar";
        sidebar.classList.add("w-64", "bg-gray-800", "p-4", "overflow-y-auto");
        container.appendChild(sidebar);

        // Main content (vuoto, verrà popolato dopo)
        const main = document.createElement("main");
        main.id = "watchlist_main";
        main.classList.add("flex-1", "p-6");
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

        const sidebarTitle = document.createElement("h2");
        sidebarTitle.classList.add("text-lg", "font-bold", "mb-4", "text-white");
        sidebarTitle.innerText = "Le tue watchlist";
        sidebar.appendChild(sidebarTitle);

        const list = document.createElement("ul");
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
    }



    addWatchlistGrid(watchlist) {
        // Container griglia
        const grid_container = document.createElement("div");
        grid_container.id = "watchlist_grid";
        grid_container.classList.add("flex-1", "p-6");

        // Titolo
        const title = document.createElement("h1");
        title.classList.add("text-2xl", "font-bold", "mb-6");
        title.innerText = "Film della watchlist: " + watchlist.name;
        grid_container.appendChild(title);

        // Griglia (vuota, verrà popolata dopo)
        const grid = document.createElement("div");
        grid.classList.add(
            "grid",
            "grid-cols-2",
            "sm:grid-cols-3",
            "md:grid-cols-4",
            "lg:grid-cols-5",
            "gap-6"
        );
        grid_container.appendChild(grid);

        return grid_container; // ritorno il contenitore
    }

    async renderMovies(movies) {
        console.log(movies);
        this.addWatchlistGridElements(movies);
    }

    async addWatchlistGridElements(movies) {
        let grid = document.getElementById("watchlist_grid").querySelector("div");

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
                "duration-200"
            );

            // Poster
            const img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('w780', movie.poster_path);
            img.alt = movie.title;
            img.classList.add("w-full", "h-64", "object-cover");
            card.appendChild(img);

            // Info
            const info = document.createElement("div");
            info.classList.add("p-3");

            const title = document.createElement("h3");
            title.classList.add("text-lg", "font-semibold");
            title.innerText = movie.title;

            const duration = document.createElement("p");
            duration.classList.add("text-gray-400", "text-sm");
            duration.innerText = movie.runtime ? `${movie.runtime} min` : "";

            info.appendChild(title);
            info.appendChild(duration);
            card.appendChild(info);

            grid.appendChild(card);
        });
    }

}
