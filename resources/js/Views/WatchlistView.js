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


    async populatewatchlistelement(callback){
        let sidebar = document.getElementById("left");
        let sidebarList = document.getElementById("watchlist");
        let watchlists = await callback();
        watchlists.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("hover:bg-gray-700", "p-2", "rounded", "cursor-pointer");
            li.innerText = item.name;
            sidebarList.appendChild(li);
            });
        sidebar.appendChild(sidebarList);
    }

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

}
