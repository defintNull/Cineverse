
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
        container.classList.add("relative", "w-full", "h-80");

        // Background image
        let img = document.createElement("img");
        img.id = "bg_image";
        img.classList.add("w-full", 'h-full');

        // Searchbar for access the movie catalog
        let sbar = this.#searchbar.getComponentElement();
        sbar.id = "search_form";
        sbar.classList.add("z-10", "absolute", "top-16", "left-1/2", "-translate-x-1/2", "w-2/5");
        sbar.querySelector("input").name = "search";

        // Append elements
        container.appendChild(img);
        container.appendChild(sbar);
        document.body.querySelector("main").appendChild(container);

        // Carousel section
        // Carousel container
        container = document.createElement("div");
        container.classList.add("w-full", "flex", "flex-col", "items-left", "pt-8", "gap-y-16", "pb-16");
        container.id = "carousel_container";
        document.body.querySelector("main").appendChild(container);

    }

    addEventListeners(latest_movies, pop_movies, latest_series, popular_series) {
        let main = this;
        const scrollHandlers = {};

        function carouselScrollHandler(element_id, callback) {
            let element = document.getElementById(element_id).querySelector("div");
            if((element.scrollWidth - element.clientWidth - element.scrollLeft) < 50) {
                if(element_id == "latest_movies_carousel") {
                    main.addLatestMoviesCarouselElements(latest_movies);
                } else if(element_id == "popular_movies_carousel") {
                    main.addPopularMoviesCarouselElements(pop_movies);
                } else if(element_id == "on_air_series_carousel") {
                    main.adOdnAirSeriesCarouselElements(latest_series);
                } else if(element_id == "popular_series_carousel") {
                    main.addPopularSeriesCarouselElements(popular_series);
                }
                element.removeEventListener("scroll", scrollHandlers[element_id]);
            }
        }

        ["latest_movies_carousel", "popular_movies_carousel", "on_air_series_carousel", "popular_series_carousel"].forEach(id => {
            scrollHandlers[id] = carouselScrollHandler.bind(null, id);
            document.getElementById(id).querySelector("div").addEventListener("scroll", scrollHandlers[id]);
        });
    }

    addBGImage(src) {
        let img = document.getElementById("bg_image");
        img.src = src;
    }

    addLatestMoviesCarousel() {
        // Latest Movies
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.id = "latest_movies_carousel";
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "Latest Movies";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "gap-x-16", "relative", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    addLatestMoviesCarouselElements(movies) {
        let carousel = document.getElementById("latest_movies_carousel").querySelector("div");

        // Creating carousell elements
        [...movies].forEach(movie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', movie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });
    }

    addPopularMoviesCarousel() {
        // Popular Movies
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.id = "popular_movies_carousel";
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "Popular Movies";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "relative", "gap-x-16", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    addPopularMoviesCarouselElements(movies) {
        let carousel = document.getElementById("popular_movies_carousel").querySelector("div");

        // Creating carousell elements
        [...movies].forEach(movie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', movie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });
    }

    addOnAirSeriesCarousel() {
        // On Air Series
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.id = "on_air_series_carousel";
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "On Air Series";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "gap-x-16", "relative", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    adOdnAirSeriesCarouselElements(series) {
        let carousel = document.getElementById("on_air_series_carousel").querySelector("div");

        // Creating carousell elements
        [...series].forEach(serie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', serie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });
    }

    addPopularSeriesCarousel(series) {
        // Popular Series
        let container = document.getElementById("carousel_container");

        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.id = "popular_series_carousel";
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "Popular Series";

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "gap-x-16", "relative", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    addPopularSeriesCarouselElements(series) {
        let carousel = document.getElementById("popular_series_carousel").querySelector("div");

        // Creating carousell elements
        [...series].forEach(serie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', serie.poster_path);
            element.appendChild(img);
            carousel.appendChild(element);
        });
    }
}
