import { AddButton } from "../Components/AddButton";
import { NavigatorElement } from "../Components/NavigatorElement";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { MovieDBService } from "../Services/MovieDBService";
import { View } from "./View";

export class DetailView extends View {
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

        // container
        let container = document.createElement("div");
        container.classList.add("relative", "w-full", "h-[500px]","overflow-hidden");

        // Left gradient
        let gradient = document.createElement("div");
        gradient.classList.add("absolute", "left-0", "top-0", "w-1/5", "h-full", "bg-gray-800");

        // Image wrapper
        let imgWrapper = document.createElement("div");
        imgWrapper.classList.add("absolute", "right-0", "top-0", "w-4/5", "h-full");

        // Gradient Element
        let gradientOverlay = document.createElement("div");
        gradientOverlay.classList.add(
        "absolute",
        "left-0",
        "top-0",
        "w-1/3",
        "h-full",
        "bg-gradient-to-l",   // gradient da destra verso sinistra
        "from-transparent",   // parte destra trasparente
        "to-gray-800",           // parte sinistra sfumata su bianco (o cambia colore)
        "pointer-events-none" // il gradient non blocca l'interazione
        );

        // Background image
        let img = document.createElement("img");
        img.id = "bg_image";
        img.src = MovieDBService.getImageSrc("original", element.getBGImageSrc());
        img.classList.add("w-full", 'h-full', "object-cover");

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(gradientOverlay);
        container.appendChild(gradient);
        container.appendChild(imgWrapper);

        // Navigator
        let navigator = this.#navigator.getComponentElement()
        let p = navigator.querySelector("p").cloneNode(true);
        p.classList.add("border-b-2", "border-gray-400");
        p.innerText = "Panoramica";
        navigator.querySelector("div").appendChild(p);
        p = navigator.querySelector("p").cloneNode(true);
        p.innerText = "Dettagli";
        navigator.querySelector("div").appendChild(p);
        navigator.querySelectorAll("p")[0].remove();

        container.appendChild(navigator);


        // Details
        let detail_container = document.createElement("div");
        detail_container.classList.add("flex", "flex-col", "gap-y-4");

        // Poster Image
        let posterImage = document.createElement("img");
        posterImage.classList.add("h-40", "w-30");
        posterImage.src = MovieDBService.getImageSrc("original", this.#element.getPosterImageSrc());

        // Date details
        let date_detail = document.createElement("div");
        date_detail.classList.add("flex", "flex-row");
        let release_date = document.createElement("p");
        release_date.classList.add("text-white", 'text-md');
        release_date.innerText = this.#element.getReleaseDate();
        let interrupt = document.createElement("p");
        interrupt.classList.add("text-white", 'text-md', "px-2");
        interrupt.innerText = "-";
        let time = document.createElement("p");
        time.classList.add("text-white", 'text-md');
        time.innerText = this.#element.getDuration() + " min";

        date_detail.appendChild(release_date);
        if (this.#element.getDuration.length != 0){
            date_detail.appendChild(interrupt);
            date_detail.appendChild(time);
        }


        // Score and add to whatchlist
        let buttons = document.createElement("div");
        buttons.classList.add("flex", "flex-row", "gap-x-4");
        let score_container = document.createElement("div");
        score_container.classList.add("rounded-4xl", "flex", "flex-col", "items-center", "justify-center", "h-10", "w-10", "bg-gray-700");
        let score = document.createElement("p");
        score.classList.add("text-white", "text-md");
        score.innerText = this.#element.getScore();
        score_container.appendChild(score);

        let add_to_whatchlist = document.createElement("div");
        add_to_whatchlist.classList.add("rounded-4xl", "flex", "flex-col", "items-center", "justify-center", "h-10", "w-10", "bg-gray-700");
        let add_button = this.#addButton.getComponentElement();
        add_button.classList.add("text-white");
        add_to_whatchlist.appendChild(add_button);

        buttons.appendChild(score_container);
        buttons.appendChild(add_to_whatchlist);

        // Trama
        let trama = document.createElement("p");
        trama.classList.add("text-md", "text-white", "line-clamp-3");
        trama.innerText = this.#element.getTrama();

        // Genres
        let genres = document.createElement("p");
        genres.classList.add("text-md", "text-white", "truncate");
        genres.innerText = "Genre: " + this.#element.getGenres().join(", ");


        detail_container.appendChild(posterImage);
        detail_container.appendChild(date_detail);
        detail_container.appendChild(buttons);
        detail_container.appendChild(trama);
        detail_container.appendChild(genres);

        let center_container = document.createElement("div");
        center_container.classList.add("flex", "flex-row", "items-center", "absolute", "z-10", "left-0", "h-full", "max-w-1/3", "pl-28");
        center_container.appendChild(detail_container)
        container.appendChild(center_container);




        document.body.querySelector("main").appendChild(container);

        if(this.#element instanceof Movie) {

        } else if(this.#element instanceof Serie) {

        }

    }


    addEventListeners() {

    }
}
