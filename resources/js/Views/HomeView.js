
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

    addEventListeners(
        latest_movies,
        pop_movies,
        latest_series,
        popular_series,
        handler_latest_movies,
        handler_popular_movies,
        handler_latest_series,
        handler_popular_series
    ) {
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


        /**
         * Arrow element latest_movies_carousel onmouseout
         */
        document.getElementById("latest_movies_carousel_arrow").addEventListener("mouseover", function() {
            this.classList.add("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("latest_movies_carousel_arrow").addEventListener("mouseout", function() {
            this.classList.remove("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("latest_movies_carousel_arrow").addEventListener("click", async function() {
            let movies = await handler_latest_movies();
            movies = movies.results;
            main.addLatestMoviesCarouselElements(movies.slice(0, Math.floor(movies.length / 2)));

            function scrollHandler() {
                let element = document.getElementById("latest_movies_carousel").querySelector("div");
                if((element.scrollWidth - element.clientWidth - element.scrollLeft) < 50) {
                    main.addLatestMoviesCarouselElements(movies.slice(Math.floor(movies.length / 2), movies.length));
                    element.removeEventListener("scroll", scrollHandler);
                }
            }

            document.getElementById("latest_movies_carousel").querySelector("div").addEventListener("scroll", scrollHandler);
        });

        /**
         * Arrow element popular_movies_carousel onmouseout
         */
        document.getElementById("popular_movies_carousel_arrow").addEventListener("mouseover", function() {
            this.classList.add("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("popular_movies_carousel_arrow").addEventListener("mouseout", function() {
            this.classList.remove("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("popular_movies_carousel_arrow").addEventListener("click", async function() {
            let movies = await handler_popular_movies();
            movies = movies.results;
            main.addPopularMoviesCarouselElements(movies.slice(0, Math.floor(movies.length / 2)));

            function scrollHandler() {
                let element = document.getElementById("popular_movies_carousel").querySelector("div");
                if((element.scrollWidth - element.clientWidth - element.scrollLeft) < 50) {
                    main.addPopularMoviesCarouselElements(movies.slice(Math.floor(movies.length / 2), movies.length));
                    element.removeEventListener("scroll", scrollHandler);
                }
            }

            document.getElementById("popular_movies_carousel").querySelector("div").addEventListener("scroll", scrollHandler);
        });

        /**
         * Arrow element on_air_series_carousel onmouseout
         */
        document.getElementById("on_air_series_carousel_arrow").addEventListener("mouseover", function() {
            this.classList.add("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("on_air_series_carousel_arrow").addEventListener("mouseout", function() {
            this.classList.remove("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("on_air_series_carousel_arrow").addEventListener("click", async function() {
            let movies = await handler_latest_series();
            movies = movies.results;
            main.adOdnAirSeriesCarouselElements(movies.slice(0, Math.floor(movies.length / 2)));

            function scrollHandler() {
                let element = document.getElementById("on_air_series_carousel").querySelector("div");
                if((element.scrollWidth - element.clientWidth - element.scrollLeft) < 50) {
                    main.adOdnAirSeriesCarouselElements(movies.slice(Math.floor(movies.length / 2), movies.length));
                    element.removeEventListener("scroll", scrollHandler);
                }
            }

            document.getElementById("on_air_series_carousel").querySelector("div").addEventListener("scroll", scrollHandler);
        });

        /**
         * Arrow element popular_series_carousel onmouseout
         */
        document.getElementById("popular_series_carousel_arrow").addEventListener("mouseover", function() {
            this.classList.add("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("popular_series_carousel_arrow").addEventListener("mouseout", function() {
            this.classList.remove("bg-gray-800", "cursor-pointer");
        });
        document.getElementById("popular_series_carousel_arrow").addEventListener("click", async function() {
            let movies = await handler_popular_series();
            movies = movies.results;
            main.addPopularSeriesCarouselElements(movies.slice(0, Math.floor(movies.length / 2)));

            function scrollHandler() {
                let element = document.getElementById("popular_series_carousel").querySelector("div");
                if((element.scrollWidth - element.clientWidth - element.scrollLeft) < 50) {
                    main.addPopularSeriesCarouselElements(movies.slice(Math.floor(movies.length / 2), movies.length));
                    element.removeEventListener("scroll", scrollHandler);
                }
            }

            document.getElementById("popular_series_carousel").querySelector("div").addEventListener("scroll", scrollHandler);
        });

        /**
         * Search event
         */
        document.getElementById("search_form").addEventListener("submit", function(event) {
            event.preventDefault();
        })
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
        carousel.classList.add("flex", "flex-row", "items-center", "pr-8", "gap-x-16", "relative", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Arrow Right
        let cont = document.createElement("div");
        cont.id = "latest_movies_carousel_arrow"
        cont.classList.add("rounded-4xl", "min-h-12", "min-w-12", "flex", "flex-col", "items-center", "justify-center");
        let arrow_right = this.#arrowRight.getComponentElement();
        arrow_right.classList.add("w-8", "h-8", "text-gray-700");
        cont.appendChild(arrow_right);
        carousel.appendChild(cont);

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);
        container.appendChild(carousel_container);

        document.body.querySelector("main").appendChild(container);
    }

    addLatestMoviesCarouselElements(movies) {
        let carousel = document.getElementById("latest_movies_carousel").querySelector("div");;
        // Creating carousell elements
        [...movies].forEach(movie => {
            let element = document.createElement("div");
            element.classList.add("h-full", "min-w-44");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('original', movie.poster_path);
            element.appendChild(img);
            carousel.insertBefore(element, carousel.lastElementChild);
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
        carousel.classList.add("flex", "flex-row", "items-center", "relative", "pr-8", "gap-x-16", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Arrow Right
        let cont = document.createElement("div");
        cont.id = "popular_movies_carousel_arrow"
        cont.classList.add("rounded-4xl", "min-h-12", "min-w-12", "flex", "flex-col", "items-center", "justify-center");
        let arrow_right = this.#arrowRight.getComponentElement();
        arrow_right.classList.add("w-8", "h-8", "text-gray-700");
        cont.appendChild(arrow_right);
        carousel.appendChild(cont);

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
            carousel.insertBefore(element, carousel.lastElementChild);
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
        carousel.classList.add("flex", "flex-row", "items-center", "pr-8", "gap-x-16", "relative", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Arrow Right
        let cont = document.createElement("div");
        cont.id = "on_air_series_carousel_arrow"
        cont.classList.add("rounded-4xl", "min-h-12", "min-w-12", "flex", "flex-col", "items-center", "justify-center");
        let arrow_right = this.#arrowRight.getComponentElement();
        arrow_right.classList.add("w-8", "h-8", "text-gray-700");
        cont.appendChild(arrow_right);
        carousel.appendChild(cont);

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
            carousel.insertBefore(element, carousel.lastElementChild);
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
        carousel.classList.add("flex", "flex-row", "items-center", "pr-8", "gap-x-16", "relative", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-700", "scrollbar-track-gray-900", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Arrow Right
        let cont = document.createElement("div");
        cont.id = "popular_series_carousel_arrow"
        cont.classList.add("rounded-4xl", "min-h-12", "min-w-12", "flex", "flex-col", "items-center", "justify-center");
        let arrow_right = this.#arrowRight.getComponentElement();
        arrow_right.classList.add("w-8", "h-8", "text-gray-700");
        cont.appendChild(arrow_right);
        carousel.appendChild(cont);

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
            carousel.insertBefore(element, carousel.lastElementChild);
        });
    }
}
