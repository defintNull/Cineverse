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


    render(element) {
        this.#element = element;
        /*
        // Root container
        const container = document.createElement("div");
        container.classList.add("flex", "min-h-screen", "bg-gray-900", "text-white");

        // Sidebar (left list)
        const sidebar = document.createElement("aside");
        sidebar.id = "left"
        sidebar.classList.add("w-64", "bg-gray-800", "p-4");

        const sidebarTitle = document.createElement("h2");
        sidebarTitle.classList.add("text-lg", "font-bold", "mb-4");
        sidebarTitle.innerText = "Le tue watchlist";
        sidebar.appendChild(sidebarTitle);

        const sidebarList = document.createElement("ul");
        sidebarList.id = "watchlist"
        sidebarList.classList.add("space-y-2");


        sidebar.appendChild(sidebarList);

        // Main content (right list)
        const main = document.createElement("main");
        main.classList.add("flex-1", "p-6");

        const mainTitle = document.createElement("h1");
        mainTitle.classList.add("text-2xl", "font-bold", "mb-6");

        mainTitle.innerText = "Film della watchlist"; //QUI CI VA IL NOME DELLA WATCHLIST
        main.appendChild(mainTitle);

        const trackList = document.createElement("ul");
        trackList.classList.add("space-y-4");

        //QUI CI VANNO I FILM AL POSTO DELLE COSTANTI
        const tracks = [
            { title: "Fight Club", duration: "3:35" },
            { title: "The Illusionist", duration: "3:09" },
            { title: "The Incredible Hulk", duration: "2:49" },
            { title: "American History X", duration: "2:49" }
        ];

        //SI CICLA SUI FILM PER INSERIRLI

        tracks.forEach(track => {
            const li = document.createElement("li");
            li.classList.add("flex", "items-center", "justify-between", "hover:bg-gray-800", "p-3", "rounded");

            const spanTitle = document.createElement("span");
            spanTitle.innerText = track.title;

            const spanDuration = document.createElement("span");
            spanDuration.classList.add("text-gray-400");
            spanDuration.innerText = track.duration;

            li.appendChild(spanTitle);
            li.appendChild(spanDuration);
            trackList.appendChild(li);
        });

        main.appendChild(trackList);

        // Assemble layout
        container.appendChild(sidebar);
        container.appendChild(main);

        // Append to <main> in DOM
        document.body.querySelector("main").appendChild(container);
    }

        */

        // Main content (right grid)
        const main = document.createElement("main");
        main.classList.add("flex-1", "p-6");

        const mainTitle = document.createElement("h1");
        mainTitle.classList.add("text-2xl", "font-bold", "mb-6");
        mainTitle.innerText = "Film della watchlist"; // QUI CI VA IL NOME DELLA WATCHLIST
        main.appendChild(mainTitle);

        // Griglia di card
        const grid = document.createElement("div");
        grid.classList.add(
        "grid",
        "grid-cols-2",       // 2 colonne su schermi piccoli
        "sm:grid-cols-3",    // 3 colonne su schermi medi
        "md:grid-cols-4",    // 4 colonne su schermi grandi
        "lg:grid-cols-5",    // 5 colonne su schermi larghi
        "gap-6"              // spazio tra le card
        );

        // Dati di esempio
        const tracks = [
        { title: "Fight Club", duration: "3:35", poster: "fightclub.jpg" },
        { title: "The Illusionist", duration: "3:09", poster: "illusionist.jpg" },
        { title: "The Incredible Hulk", duration: "2:49", poster: "hulk.jpg" },
        { title: "American History X", duration: "2:49", poster: "american.jpg" }
        ];

        // Ciclo sui film per creare le card
        tracks.forEach(track => {
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
        img.src = track.poster; // qui metti il path del poster (o da TMDb)
        img.alt = track.title;
        img.classList.add("w-full", "h-64", "object-cover");
        card.appendChild(img);

        // Info
        const info = document.createElement("div");
        info.classList.add("p-3");

        const title = document.createElement("h3");
        title.classList.add("text-lg", "font-semibold");
        title.innerText = track.title;

        const duration = document.createElement("p");
        duration.classList.add("text-gray-400", "text-sm");
        duration.innerText = track.duration;

        info.appendChild(title);
        info.appendChild(duration);
        card.appendChild(info);

        grid.appendChild(card);
        });

        main.appendChild(grid);
    }


/*

    addWatchlistCarousel(watchlist) {
        // Container
        let carousel_container = document.createElement("div");
        carousel_container.id = "watchlist_carousel";
        carousel_container.classList.add(
            "flex", "flex-col", "items-left", "w-full", "pl-8", "overflow-x-auto"
        );

        // Titolo
        let title = document.createElement("p");
        title.classList.add(
            "text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4"
        );
        title.innerText = "Film della watchlist: " + watchlist.name;

        // Contenitore orizzontale
        let carousel = document.createElement("div");
        carousel.classList.add(
            "flex", "flex-row", "items-center", "pr-8", "gap-x-16",
            "relative", "py-4", "h-80", "overflow-x-auto", "mt-6",
            "scrollbar", "scrollbar-thumb-gray-400", "scrollbar-track-gray-100",
            "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800"
        );

        // Append
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);

        document.body.querySelector("main").appendChild(carousel_container);
    }

    addWatchlistCarouselElements(movies) {
    let carousel = document.getElementById("watchlist_carousel").querySelector("div");

        movies.forEach(movie => {
            let card = document.createElement("div");
            card.classList.add("h-full", "min-w-44", "cursor-pointer", "watchlist_card");

            // Poster
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('w780', movie.poster_path);
            img.alt = movie.title;
            card.appendChild(img);

            // Hidden id
            let input = document.createElement("input");
            input.type = "text";
            input.value = movie.id;
            input.hidden = true;
            card.appendChild(input);

            carousel.appendChild(card);
        });
    }

    */

    addWatchlistGrid(watchlist) {
        // Container
        let grid_container = document.createElement("div");
        grid_container.id = "watchlist_grid";
        grid_container.classList.add(
            "flex", "flex-col", "items-left", "w-full", "pl-8"
        );

        // Titolo
        let title = document.createElement("p");
        title.classList.add(
            "text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4"
        );
        title.innerText = "Film della watchlist: " + watchlist.name;

        // Contenitore griglia
        let grid = document.createElement("div");
        grid.classList.add(
            "grid",
            "grid-cols-2",       // 2 colonne su schermi piccoli
            "sm:grid-cols-3",    // 3 colonne su schermi medi
            "md:grid-cols-4",    // 4 colonne su schermi grandi
            "lg:grid-cols-5",    // 5 colonne su schermi larghi
            "gap-6",             // spaziatura tra le card
            "mt-6"
        );

        // Append
        grid_container.appendChild(title);
        grid_container.appendChild(grid);

        document.body.querySelector("main").appendChild(grid_container);
    }

    addWatchlistGridElements(movies) {
        let grid = document.getElementById("watchlist_grid").querySelector("div");

        movies.forEach(movie => {
            let card = document.createElement("div");
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
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('w780', movie.poster_path);
            img.alt = movie.title;
            img.classList.add("w-full", "h-64", "object-cover");
            card.appendChild(img);

            // Info
            let info = document.createElement("div");
            info.classList.add("p-3");

            let title = document.createElement("h3");
            title.classList.add("text-lg", "font-semibold");
            title.innerText = movie.title;

            let duration = document.createElement("p");
            duration.classList.add("text-gray-400", "text-sm");
            duration.innerText = movie.runtime ? `${movie.runtime} min` : "";

            info.appendChild(title);
            info.appendChild(duration);
            card.appendChild(info);

            // Hidden id
            let input = document.createElement("input");
            input.type = "text";
            input.value = movie.id;
            input.hidden = true;
            card.appendChild(input);

            grid.appendChild(card);
        });
    }

    addWatchlistSidebar(watchlists) {
            // Sidebar container
            const sidebar = document.createElement("aside");
            sidebar.id = "left";
            sidebar.classList.add("w-64", "bg-gray-800", "p-4", "overflow-y-auto");

            // Titolo
            const sidebarTitle = document.createElement("h2");
            sidebarTitle.classList.add("text-lg", "font-bold", "mb-4", "text-white");
            sidebarTitle.innerText = "Le tue watchlist";
            sidebar.appendChild(sidebarTitle);

            // Lista
            const list = document.createElement("ul");
            list.id = "watchlist";
            list.classList.add("space-y-2");
            console.log("watchlists is:", watchlists, Array.isArray(watchlists));
            // Ciclo sulle watchlist
            watchlists.forEach(w => {
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

                // Event handler: quando clicchi, carichi i film a destra
                li.addEventListener("click", () => {
                    // svuota la parte destra e ricarica la griglia
                    document.getElementById("watchlist_grid")?.remove();
                    this.addWatchlistGrid(w);
                    this.addWatchlistGridElements(w.movies);
                });

                list.appendChild(li);
            });

            sidebar.appendChild(list);

            // Append alla pagina
            document.body.querySelector("main").appendChild(sidebar);
        }


}
