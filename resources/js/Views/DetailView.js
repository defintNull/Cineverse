import { AddButton } from "../Components/AddButton";
import { NavigatorElement } from "../Components/NavigatorElement";
import { WatchlistCard } from "../Components/WatchlistCard";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { AuthService } from "../Services/AuthService";
import { MovieDBService } from "../Services/MovieDBService";
import { View } from "./View";

export class DetailView extends View {
    #element;
    #navigator;
    #addButton;
    #clickhandler;
    #authService;
    #watchlistCard;

    constructor() {
        super();
        this.#navigator = new NavigatorElement();
        this.#addButton = new AddButton();
        this.#authService = AuthService.getInstance();
        this.#watchlistCard = new WatchlistCard();
    }

    render(element) {
        this.#element = element;

        // Preview Element
        let container = this.#getPreviewElement();
        document.body.querySelector("main").appendChild(container);

        // Detail Element
        container = this.#getDetailElement();
        document.body.querySelector("main").appendChild(container);
    }

    addEventListeners(element, suggested_click_callback, getWatchlistCallback, addWatchlistElementCallback) {
        let main = this;
        document.getElementById("detail_button").addEventListener("click", function() {
            document.getElementById("preview_button").classList.remove("border-b-2");
            this.classList.add("border-b-2");

            let detail = document.getElementById("detail_container");
            detail.style.height = "auto";
            const fullHeight = detail.scrollHeight + "px";

            detail.style.height = "0px";
            void detail.offsetHeight;

            detail.style.height = fullHeight;
            detail.classList.remove("opacity-0");
        });

        document.getElementById("preview_button").addEventListener("click", function() {
            document.getElementById("detail_button").classList.remove("border-b-2");
            this.classList.add("border-b-2");

            let detail = document.getElementById("detail_container");
            detail.style.height = detail.scrollHeight + "px";
            void detail.offsetHeight;

            detail.style.height = "0px";
            detail.classList.add("opacity-0");

            setTimeout(() => {
            detail.style.height = "0px";
            }, 500);
        });

        if(this.#element instanceof Movie) {
            /**
             * Click handler function
             */
            this.#clickhandler = function(event) {
                const card = event.target.closest(".suggested_card");
                if (card && document.body.contains(card)) {
                    const input = card.querySelector("input");
                    if (input) {
                        suggested_click_callback(input.value);
                    }
                }
            }
            /**
             * Adding click events for movies
             */
            document.addEventListener("click", this.#clickhandler);
        } else if(this.#element instanceof Serie) {
            /**
             * Click handler function
             */
            this.#clickhandler = function(event) {
                const card = event.target.closest(".suggested_card");
                if (card && document.body.contains(card)) {
                    const input = card.querySelector("input");
                    if (input) {
                        suggested_click_callback(input.value);
                    }
                }
            }
            /**
             * Adding click event for series
             */
            document.addEventListener("click", this.#clickhandler);
        }

        if(main.#authService.checkAuth()) {
            // Populate watchlist list
            (async () => {
                let watchlists = await getWatchlistCallback();
                if(watchlists == 400) {
                    let error_div = document.createElement("div");
                    error_div.classList.add("flex", "flex-col", "items-center", "justify-center", "w-full", "h-full");
                    let error = document.createElement("p");
                    error.classList.add("text-xl", "text-white", "text-center", "font-semibold");
                    error.innerHTML = "Something <br> went wrong!";
                    error_div.appendChild(error);
                    document.getElementById("watchlist_container").appendChild(error_div);
                } else {
                    watchlists.forEach(watchlist => {
                        let watchlist_card = main.#watchlistCard.getComponentElement();
                        watchlist_card.querySelector("p.name").innerText = watchlist.getName();
                        watchlist_card.querySelector("input[name='watchlist_id']").value = watchlist.getId();

                        let type = element instanceof Movie ? "Movie" : "Serie";
                        if(!watchlist.checkElement(type, element.getId())) {
                            watchlist_card.querySelector("div.check").classList.add("hidden");
                            watchlist_card.classList.add("cursor-pointer");
                        } else {
                            watchlist_card.classList.remove("bg-gray-600");
                            watchlist_card.classList.add("bg-gray-700", "border", "border-gray-500");
                        }

                        document.getElementById("watchlist_container").appendChild(watchlist_card);
                    });
                }
            })();

            document.getElementById("add_to_whatchlist_button").addEventListener("click", function(event) {
                document.getElementById("watchlist_container").classList.toggle("hidden");
            });


            // Add button color events
            document.getElementById("watchlist_container").addEventListener("mouseover", function(event) {
                this.parentElement.classList.remove("hover:bg-gray-600");
            });
            document.getElementById("watchlist_container").addEventListener("mouseout", function(event) {
                this.parentElement.classList.add("hover:bg-gray-600");
            });
            document.getElementById("watchlist_container").addEventListener("click", function(event) {
                event.stopPropagation();
            });

            // Add element to watchlist
            document.getElementById("watchlist_container").addEventListener("click", async function(event) {
                const watchlist_card = event.target.closest("div.watchlist-card");
                if(watchlist_card && this.contains(watchlist_card) && watchlist_card.querySelector("div.check.hidden")) {
                    let type = element instanceof Movie ? "Movie" : "Serie";
                    let res = await addWatchlistElementCallback(watchlist_card.querySelector("input[name='watchlist_id']").value ,type, element.getId());
                    if(res == 200) {
                        watchlist_card.classList.remove("bg-gray-600");
                        watchlist_card.classList.add("bg-gray-700", "border", "border-gray-500");
                        watchlist_card.querySelector("div.check").classList.remove("hidden");
                    }
                }
            });
        }
    }

    removeDocumentEvents() {
        document.removeEventListener("click", this.#clickhandler);
    }

    #getPreviewElement() {
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
        img.src = MovieDBService.getImageSrc("original", this.#element.getBGImageSrc());
        img.classList.add("w-full", 'h-full', "object-cover");

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(gradientOverlay);
        container.appendChild(gradient);
        container.appendChild(imgWrapper);

        // Navigator
        let navigator = this.#navigator.getComponentElement()
        let p = navigator.querySelector("p").cloneNode(true);
        p.classList.add("border-b-2", "border-gray-400");
        p.id = "preview_button";
        p.innerText = "Panoramica";
        navigator.querySelector("div").appendChild(p);
        p = navigator.querySelector("p").cloneNode(true);
        p.classList.add("border-gray-400");
        p.id = "detail_button";
        p.innerText = "Dettagli";
        navigator.querySelector("div").appendChild(p);
        navigator.querySelectorAll("p")[0].remove();

        container.appendChild(navigator);


        // Details
        let detail_container = document.createElement("div");
        detail_container.classList.add("flex", "flex-col", "gap-y-4");

        //Title insertion
        let title_detail = document.createElement("h1");
        title_detail.classList.add("text-white", "text-3xl", "font-bold", "tracking-wide");
        title_detail.innerText = this.#element.getTitle();

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
        if (this.#element.getDuration().length != 0){
            date_detail.appendChild(interrupt);
            date_detail.appendChild(time);
        }


        // Score and add to whatchlist
        let buttons = document.createElement("div");
        buttons.classList.add("flex", "flex-row", "gap-x-4");
        let score_container = document.createElement("div");
        score_container.classList.add("rounded-4xl", "flex", "flex-col", "items-center", "justify-center", "h-10", "w-10", "bg-gray-700");
        let score = document.createElement("p"); //possibilità di aggiunta dell'animazione
        score.classList.add("text-white", "text-md");
        score.innerText = this.#element.getScore();
        score_container.appendChild(score);

        buttons.appendChild(score_container);

        if(this.#authService.checkAuth()) {
            let add_to_whatchlist = document.createElement("div");
            add_to_whatchlist.id = "add_to_whatchlist_button";
            add_to_whatchlist.classList.add("rounded-4xl", "flex", "flex-col", "relative", "items-center", "justify-center", "cursor-pointer", "h-10", "w-10", "bg-gray-700", "hover:bg-gray-600");
            let add_button = this.#addButton.getComponentElement();
            add_button.classList.add("text-white");
            add_to_whatchlist.appendChild(add_button);

            let watchlist_container = document.createElement("div");
            watchlist_container.id = "watchlist_container";
            watchlist_container.classList.add("hidden", "absolute", "bottom-0", "left-0", "transform", "translate-x-12", "translate-y-36", "cursor-default", "rounded-xl", "flex", "flex-col", "items-center", "w-60", "max-h-60", "h-60", "px-2", "py-3", "gap-y-2", "bg-gray-700", "overflow-y-auto", "scrollbar", "scrollbar-thumb-gray-500", "scrollbar-track-gray-700");
            add_to_whatchlist.appendChild(watchlist_container);
            buttons.appendChild(add_to_whatchlist);
        }

        // Trama
        let trama = document.createElement("p");
        trama.classList.add("text-md", "text-white", "line-clamp-3");
        trama.innerText = this.#element.getTrama();

        // Genres
        let genres = document.createElement("p");
        genres.classList.add("text-md", "text-white", "truncate");
        genres.innerText = "Genre: " + this.#element.getGenres().join(", ");


        detail_container.appendChild(title_detail);
        detail_container.appendChild(posterImage);
        detail_container.appendChild(date_detail);
        detail_container.appendChild(buttons);
        detail_container.appendChild(trama);
        detail_container.appendChild(genres);

        let center_container = document.createElement("div");
        center_container.classList.add("flex", "flex-row", "items-center", "absolute", "z-10", "left-0", "h-full", "max-w-1/3", "pl-28");
        center_container.appendChild(detail_container)
        container.appendChild(center_container);

        return container;
    }

    #getDetailElement() {
        // Detail Element
        let container = document.createElement("div");
        container.id = "detail_container";
        container.classList.add("flex", "flex-col", "w-full", "pt-8", "pb-12", "items-center", "transition-all", "duration-500", "ease-in-out", "overflow-hidden", "opacity-0");
        container.style.height = "0px";

        let row = document.createElement("div");
        row.classList.add("flex", "flex-row");

        // Poster Image
        let posterImage = document.createElement("img");
        posterImage.classList.add("h-72", "w-48");
        posterImage.src = MovieDBService.getImageSrc("original", this.#element.getPosterImageSrc());
        row.appendChild(posterImage);

        // Detail near the image
        let detail_container = document.createElement("div");
        detail_container.classList.add("grid", "grid-cols-2", "items-center", "justify-start", "pl-20", "gap-x-40");

        let p = document.createElement("p");
        p.classList.add("text-md", "dark:text-white", "text-gray-900", "flex", "flex-row", "gap-x-2", "items-baseline");
        let title = document.createElement("span");
        title.classList.add("font-semibold", "text-2xl");
        let detail = document.createElement("span", "text-2xl");
        p.appendChild(title);
        p.appendChild(detail);

        // Name
        let iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Name:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getTitle();
        detail_container.appendChild(iter);

        // Score
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Score:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getScore();
        detail_container.appendChild(iter);

        // Release Date
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Release date:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getReleaseDate();
        detail_container.appendChild(iter);

        // Adult
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Adult:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getAdult() ? "+18" : "No";
        detail_container.appendChild(iter);

        // Duration
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Duration:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getDuration();
        detail_container.appendChild(iter);

        // Genres
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Genres:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getGenres().join(", ");
        iter.classList.add("row-span-3");
        detail_container.appendChild(iter);

        // Status
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Status:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getStatus();
        detail_container.appendChild(iter);

        // Language
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Language:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getLanguage();
        detail_container.appendChild(iter);

        row.appendChild(detail_container);
        container.appendChild(row);


        // Secondaty details
        let col = document.createElement("div");
        col.classList.add("flex", "flex-col", "w-2/3", "pt-6", "mt-8", "gap-y-4", "border-t", "dark:border-white", "border-gray-500");

        // Trama
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Trama:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getTrama();
        col.appendChild(iter);

        // Production Companies
        iter = p.cloneNode(true);
        iter.querySelectorAll("span")[0].innerText = "Production Companies:";
        iter.querySelectorAll("span")[1].innerText = this.#element.getProductionCompanies().join(", ");
        col.appendChild(iter);

        if(this.#element instanceof Movie) {
            // Budget
            iter = p.cloneNode(true);
            iter.querySelectorAll("span")[0].innerText = "Budget:";
            iter.querySelectorAll("span")[1].innerText = this.#element.getBudget() + "$";
            col.appendChild(iter);

            // Revenue
            iter = p.cloneNode(true);
            iter.querySelectorAll("span")[0].innerText = "Revenue:";
            iter.querySelectorAll("span")[1].innerText = this.#element.getRevenue() + "$";
            col.appendChild(iter);
        } else if(this.#element instanceof Serie) {
            // Created by
            iter = p.cloneNode(true);
            iter.querySelectorAll("span")[0].innerText = "Created by:";
            iter.querySelectorAll("span")[1].innerText = this.#element.getCreator().join(", ");
            col.appendChild(iter)

            // Number of episodes
            iter = p.cloneNode(true);
            iter.querySelectorAll("span")[0].innerText = "Number of Episodes:";
            iter.querySelectorAll("span")[1].innerText = this.#element.getNumberOfEpisodes();
            col.appendChild(iter);

            // Number of seasons
            iter = p.cloneNode(true);
            iter.querySelectorAll("span")[0].innerText = "Number of Seasons:";
            iter.querySelectorAll("span")[1].innerText = this.#element.getNumberOfSeasons();
            col.appendChild(iter);

            // Seasons
            iter = p.cloneNode(true);
            iter.querySelectorAll("span")[0].innerText = "Seasons:";
            iter.classList.add("pt-4")
            col.appendChild(iter);

            let series_container = document.createElement("div");
            series_container.classList.add("grid", "grid-cols-4", "gap-x-4", "gap-y-4");
            this.#element.getSeasons().forEach(el => {
                let serie = document.createElement("div");
                serie.classList.add("flex", "flex-col", "px-6", "py-4", "dark:bg-gray-700", "bg-slate-50", "rounded-2xl");
                let temp = p.cloneNode(true);
                temp.querySelectorAll("span")[0].innerText = "Name";
                temp.querySelectorAll("span")[1].innerHTML = el.name;
                serie.appendChild(temp);
                temp = p.cloneNode(true);
                temp.querySelectorAll("span")[0].innerText = "Episodes:";
                temp.querySelectorAll("span")[1].innerHTML = el.episode_count;
                serie.appendChild(temp);
                temp = p.cloneNode(true);
                temp.querySelectorAll("span")[0].innerText = "Score";
                temp.querySelectorAll("span")[1].innerHTML = el.vote_average;
                serie.appendChild(temp);
                series_container.appendChild(serie);
            });
            col.appendChild(series_container);
        }
        container.appendChild(col);

        return container
    }

    addSuggestedCarousel() {
        // Carousel
        let carousel_container = document.createElement("div");
        carousel_container.id = "suggested_carousel";
        carousel_container.classList.add("flex", "flex-col", 'items-left', "w-full", "pl-8", "overflow-x-auto");

        // Carousell title
        let title = document.createElement("p");
        title.classList.add("text-gray-900", "dark:text-white", "text-2xl", "font-semibold", "pl-4");
        title.innerText = "Suggested " + ((this.#element instanceof Movie) ? "Movies" : "Series");

        // Carousell element container
        let carousel = document.createElement("div");
        carousel.classList.add("flex", "flex-row", "items-center", "pr-8", "gap-x-16", "relative", "py-4", "h-80", "overflow-x-auto", "mt-6", "scrollbar", "scrollbar-thumb-gray-400", "scrollbar-track-gray-100", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Appending elements
        carousel_container.appendChild(title);
        carousel_container.appendChild(carousel);

        document.body.querySelector("main").appendChild(carousel_container);
    }

    addSuggestedCarouselElements(elements) {
        let carousel = document.getElementById("suggested_carousel").querySelector("div");
        // Creating carousell elements
        [...elements].forEach(element => {
            let temp = document.createElement("div");
            temp.classList.add("h-full", "min-w-44", "cursor-pointer", "suggested_card");
            let img = document.createElement("img");
            img.src = MovieDBService.getImageSrc('w780', element.getPosterImageSrc());
            temp.appendChild(img);
            let input = document.createElement("input");
            input.type = "text",
            input.value = element.getId();
            input.hidden = true;
            temp.appendChild(input);
            carousel.insertBefore(temp, carousel.lastElementChild);
        });
    }
}
