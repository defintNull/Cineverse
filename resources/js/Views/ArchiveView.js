import { AutocompleteInput } from "../Components/AutocompleteInput";
import { CheckboxWall } from "../Components/CheckboxWall";
import { Input } from "../Components/Input";
import { Searchbar } from "../Components/Searchbar";
import { Select } from "../Components/Select";
import { Movie } from "../Models/Movie";
import { MovieDBService } from "../Services/MovieDBService";
import { View } from "./View";

export class ArchiveView extends View {
    #searchbar;
    #select;
    #autocomplete_input;
    #input;
    #checkbox_wall;
    #language_list;
    #genre_list;
    #scrollHandlerPointer;
    #documentClickHandlerPointer;
    #cardClickHandlerPointer;

    constructor() {
        super();
        this.#select = new Select();
        this.#autocomplete_input = new AutocompleteInput();
        this.#input = new Input();
        this.#checkbox_wall = new CheckboxWall();
        this.#searchbar = new Searchbar();
    }

    async render(searchHandler, state) {
        // Main container
        let container = document.createElement("div");
        container.classList.add("grid", "grid-cols-8", "w-full", "min-h-svh");


        // Filters container
        let filter_container = document.createElement("div");
        filter_container.classList.add("flex", "flex-col", "gap-y-2", "col-span-2", "mt-4", "pt-10", "px-12", "border-r-2", "border-gray-400");

        // Filter title
        let title = document.createElement("p");
        title.classList.add("text-2xl", "font-semibold", "dark:text-white", "text-gray-900", "text-center", "pb-6");
        title.innerText = "Filters";
        filter_container.appendChild(title)

        let element_container = null;
        let label = null;
        let input = null;
        let option = null;

        // Search
        let sbar = this.#searchbar.getComponentElement();
        sbar.id = "search_form";
        sbar.querySelector("input").value = ((state !== undefined && state !== null && state.search !== undefined) ? state.search : "");
        sbar.classList.add("pb-6", "border-b", "border-gray-600", "mb-2");
        filter_container.appendChild(sbar);

        // Series or movie
        element_container = this.#select.getComponentElement();
        label = element_container.querySelector("label");
        label.setAttribute("for", "ser_mov_select");
        label.innerText = "Type:"
        input = element_container.querySelector("select");
        input.id = "ser_mov_select";
        option = document.createElement("option");
        option.selected = true;
        option.value = "movie";
        option.innerHTML = "Movie";
        input.appendChild(option);
        option = document.createElement("option");
        option.value = "serie";
        option.innerHTML = "Serie";
        input.appendChild(option);
        filter_container.appendChild(element_container);

        // Language
        element_container = this.#autocomplete_input.getComponentElement();
        label = element_container.querySelector("label");
        label.setAttribute("for", "language_input");
        label.innerText = "Language:";
        input = element_container.querySelector("input");
        input.id = "language_input";
        input.placeholder = "Insert language...";
        input.nextElementSibling.name = "language_input";
        filter_container.appendChild(element_container);

        // Year
        element_container = this.#input.getComponentElement();
        label = element_container.querySelector("label");
        label.setAttribute("for", "year_input");
        label.innerText = "Year:";
        input = element_container.querySelector("input");
        input.id = "year_input";
        input.placeholder = "Insert year...";
        filter_container.appendChild(element_container);

        // Genre
        element_container = this.#checkbox_wall.getComponentElement();
        label = element_container.querySelector("label");
        label.setAttribute("for", "genre_input");
        label.innerText = "Genres:";
        input = element_container.querySelector("select");
        input.id = "genre_input";
        input.querySelector("option").innerText = "Insert genres...";
        element_container.querySelector("div").classList.add("grid", "grid-cols-2", "gap-x-4", "pt-2", "pl-2");
        element_container.querySelector("div").classList.remove("absolute");
        filter_container.appendChild(element_container);

        container.appendChild(filter_container);

        // Element container
        let elements_container = document.createElement("div");
        elements_container.id = "elements_container";
        elements_container.classList.add("col-start-3", "col-span-6", "grid", "grid-cols-5", "gap-x-2", "gap-y-4", "px-8", "py-4");
        container.appendChild(elements_container);


        document.body.querySelector("main").appendChild(container);

        this.addSearchElements(searchHandler);
    }

    addEventListeners(searchHandler, movie_click_callback, serie_click_callback) {
        let main = this;
        this.#scrollHandlerPointer = this.#scrollHandler.bind(this, searchHandler);
        this.#documentClickHandlerPointer = this.#documentClickHandler.bind(this);
        this.#cardClickHandlerPointer = this.#cardClickHandler.bind(this, movie_click_callback, serie_click_callback);

        // Search event
        document.getElementById("search_form").addEventListener("submit", async function(event) {
            event.preventDefault();
            document.getElementById("elements_container").innerHTML = "";
            main.addSearchElements(searchHandler);
        });

        // Autocomplete event for languages
        document.getElementById("language_input").addEventListener("input", function() {
            let val = this.value.trim().toLowerCase();
            let dropdown = document.getElementById("autocomplete-list");
            dropdown.innerHTML = "";

            if (val === "") {
                dropdown.classList.add("hidden");
                return;
            }

            // Check if fetch ended
            if (main.#language_list.length === 0) {
                dropdown.classList.add("hidden");
                return;
            }

            // Filtering values
            const res = main.#language_list.filter(lang => lang[1].toLowerCase().startsWith(val));
            // Check if res presents
            if (res.length === 0) {
                dropdown.classList.add("hidden");
                return;
            }

            // Creating option and adding event listeners
            res.forEach(el => {
                let option = document.createElement("option");
                option.classList.add("cursor-pointer");
                option.innerText = el[1];

                option.addEventListener("click", () => {
                    document.getElementById("language_input").value = el[1];
                    document.getElementById("language_input").nextElementSibling.value = el[0];
                    dropdown.innerHTML = "";
                    dropdown.classList.add("hidden");
                });

                option.addEventListener("mouseover", function() {
                    this.classList.add("dark:bg-gray-700", "bg-slate-50");
                });

                option.addEventListener("mouseout", function() {
                    this.classList.remove("dark:bg-gray-700", "bg-slate-50");
                });


                dropdown.appendChild(option);
            });
            dropdown.classList.remove("hidden");
        });

        document.getElementById("genre_input").addEventListener("mousedown", function(event) {
            event.preventDefault();
        });
        document.getElementById("genre_input").addEventListener("click", function(event) {
            event.stopPropagation();
            let checkbox_wall = document.getElementById("checkbox_wall");
            if(checkbox_wall.classList.contains("hidden")) {
                checkbox_wall.classList.remove("hidden");
            } else {
                checkbox_wall.classList.add("hidden");
            }
        });

        /**
         * Click event for genres
         */
        document.body.querySelector("main").querySelector("div").addEventListener("click", function (event) {
            if (event.target.matches("input[type='checkbox']")) {
                let genres_input = document.getElementById("genre_input").querySelector("option");
                let text = genres_input.innerText.trim().split(" ");

                if (!isNaN(text[0])) {
                    if(event.target.checked == true) {
                        text[0] = parseInt(text[0]) + 1;
                    } else {
                        text[0] = parseInt(text[0]) - 1;
                        if(text[0] == 0) {
                            text = ["Insert genres..."];
                        }
                    }
                    genres_input.innerText = text.join(" ");
                } else {
                    genres_input.innerText = "1 Selected";
                }
            }
        });

        /**
         * Document events
         */
        document.addEventListener("click", this.#documentClickHandlerPointer);
        document.addEventListener("click", this.#cardClickHandlerPointer)

        /**
         * Window event for scroll
         */
        window.addEventListener("scroll", this.#scrollHandlerPointer);

    }

    removeEventListeners() {
        window.removeEventListener("scroll", this.#scrollHandlerPointer);
        document.removeEventListener("click", this.#documentClickHandlerPointer);
        document.removeEventListener("click", this.#cardClickHandlerPointer)
    }

    async setLanguageList(languageHandler) {
        this.#language_list = await languageHandler();
    }

    async setGenresList(genreHandler) {
        this.#genre_list = await genreHandler(true);

        let checkbox_wall = document.getElementById("checkbox_wall");
        let checkbox = checkbox_wall.firstElementChild.cloneNode(true);
        checkbox_wall.firstElementChild.remove();

        this.#genre_list.forEach(el => {
            let selector = checkbox.cloneNode(true);
            selector.querySelector("input").value = el.id;
            selector.querySelector("label").innerText = el.name;

            checkbox_wall.appendChild(selector);
        });
    }

    async addSearchElements(searchHandler) {
        let search = document.getElementById("search_form").querySelector("input[type='search']").value;
        let type = document.getElementById("ser_mov_select").value;
        let language = document.getElementById("language_input").nextElementSibling.value;
        let year = document.getElementById("year_input").value;
        let genres = [];
        document.querySelectorAll("input[type='checkbox']:checked").forEach(el => {
            genres.push(el.value);
        });

        search = {
            'search': search,
            'type': type,
            'language': language,
            'year': year,
            'genres': genres,
        };

        let elements = await searchHandler(search);

        let elements_container = document.getElementById("elements_container");
        elements.forEach(el => {
            let card = document.createElement("div");
            card.classList.add("bg-slate-50", "dark:bg-gray-700", "max-h-[440px]", "rounded-xl", "flex", "flex-col", "pb-2", "cursor-pointer");
            el instanceof Movie ? card.classList.add("movie-card") : card.classList.add("serie-card");
            let img = document.createElement("img");
            img.classList.add("rounded-t-xl");
            img.src = MovieDBService.getImageSrc("w500", el.getPosterImageSrc());
            card.appendChild(img);
            let name = document.createElement("p");
            name.classList.add("text-gray-900", "dark:text-white", "text-lg", "pt-1", "font-medium", "px-2");
            name.innerText = el.getTitle();
            card.appendChild(name);
            let score = document.createElement("p");
            score.classList.add("text-gray-900", "dark:text-white", "text-lg", "px-2");
            score.innerText = "Score: " + el.getScore();
            card.appendChild(score);
            let input = document.createElement("input");
            input.hidden = true;
            input.name = "id";
            input.value = el.getId();
            card.appendChild(input);
            elements_container.appendChild(card);
        });
    }

    async #scrollHandler(searchHandler) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const threshold = 200; // distanza dal fondo (in pixel)
        if (scrollTop + windowHeight >= documentHeight - threshold) {
            window.removeEventListener("scroll", this.#scrollHandlerPointer);
            await this.addSearchElements(searchHandler);
            window.addEventListener("scroll", this.#scrollHandlerPointer);
        }
    }

    #documentClickHandler(event) {
        if (!event.target.closest("#language_input") && !event.target.closest("#autocomplete-list")) {
            document.getElementById("autocomplete-list").innerHTML = "";
            document.getElementById("autocomplete-list").classList.add("hidden");
        }

        if (!event.target.closest("#checkbox_wall")) {
            document.getElementById("checkbox_wall").classList.add("hidden");
        }
    }

    #cardClickHandler(movie_click_callback, serie_click_callback, event) {
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
    }
}
