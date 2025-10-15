
import { ArrowLeft } from "../Components/ArrowLeft";
import { ArrowRight } from "../Components/ArrowRight";
import { Searchbar } from "../Components/Searchbar";
import { MovieDBService } from "../Services/MovieDBService";
import { View } from "./View";

/**
 * View class that manage the home page
 */
export class HomeView extends View {
    #searchbar
    #arrowRight
    #arrowLeft

    constructor() {
        super();
        this.#searchbar = new Searchbar();
        this.#arrowRight = new ArrowRight();
        this.#arrowLeft = new ArrowLeft();
    }

    /**
     * Render method to print the necessary elements for the home page
     */
    render() {
        // Search Section
        // Search module
        let container = document.createElement("div");
        container.classList.add("relative", "w-full", "h-60", "bg-red-500");

        // Background image
        let img = document.createElement("div");
        img.classList.add("w-full", 'h-full');

        // Searchbar for access the movie catalog
        let sbar = this.#searchbar.getComponentElement();
        sbar.id = "search_form";
        sbar.classList.add("z-10", "absolute", "top-1/2", "left-1/2", "-translate-x-1/2", "-translate-y-1/2", "w-2/5");
        sbar.querySelector("input").name = "search";

        // Append elements
        container.appendChild(img);
        container.appendChild(sbar);
        document.body.querySelector("main").appendChild(container);

        // Carousel section
        // Carousel container
        container = document.createElement("div");
        container.classList.add("w-full", "flex", "flex-col", "items-left", "pt-8", "gap-y-8");
        container.id = "carousel_container";
        document.body.querySelector("main").appendChild(container);

    }

    addEventListeners() {

    }

    addLatestMoviesCarousel(movies) {
        // Latest Movies
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "Latest Movies";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "relative", "h-72", "overflow-x-auto");

        // Creating carousell elements
        [...movies].forEach(movie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', movie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    addPopularMoviesCarousel(movies) {
        // Popular Movies
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "Popular Movies";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "relative", "h-72", "overflow-x-auto");

        // Creating carousell elements
        [...movies].forEach(movie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', movie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    addOnAirSeriesCarousel(series) {
        // On Air Series
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "On Air Series";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "relative", "h-72", "overflow-x-auto");

        // Creating carousell elements
        [...series].forEach(serie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', serie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    addPopularSeriesCarousel(series) {
        // Popular Series
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "Popular Series";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "relative", "h-72", "overflow-x-auto");

        // Creating carousell elements
        [...series].forEach(serie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', serie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }
}
