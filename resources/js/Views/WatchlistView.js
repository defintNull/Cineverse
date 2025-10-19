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
        sidebar.classList.add("w-64", "bg-gray-800", "p-4");

        const sidebarTitle = document.createElement("h2");
        sidebarTitle.classList.add("text-lg", "font-bold", "mb-4");
        sidebarTitle.innerText = "Le tue watchlist";
        sidebar.appendChild(sidebarTitle);

        const sidebarList = document.createElement("ul");
        sidebarList.classList.add("space-y-2");

        async function loadWatchlists() {  //PRENDO LE WATCHLIST DAL DB
        const res = await fetch("/api/watchlists");
        const data = await res.json();
        return data.map(w => Watchlist.fromJson(w));
        }
        //watchlists[0].name è il nome della prima watchlist presa
        //QUI PRENDO I NOMI DELLE WATCHLIST E LI VISUALIZZO NELLA LISTA A SX
        loadWatchlists().then(watchlists => {
            watchlists.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("hover:bg-gray-700", "p-2", "rounded", "cursor-pointer");
            li.innerText = item.name;
            sidebarList.appendChild(li);
        });
        });

        sidebar.appendChild(sidebarList);

        // Main content (right list)
        const main = document.createElement("main");
        main.classList.add("flex-1", "p-6");

        const mainTitle = document.createElement("h1");
        mainTitle.classList.add("text-2xl", "font-bold", "mb-6");
        mainTitle.innerText = "Film della watchlist";
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
}
