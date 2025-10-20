import { AutocompleteInput } from "../Components/AutocompleteInput";
import { CheckboxWall } from "../Components/CheckboxWall";
import { Input } from "../Components/Input";
import { Select } from "../Components/Select";
import { View } from "./View";

export class ArchiveView extends View {
    #select;
    #autocomplete_input;
    #input;
    #checkbox_wall;
    #language_list;
    #genre_list;

    constructor() {
        super();
        this.#select = new Select();
        this.#autocomplete_input = new AutocompleteInput();
        this.#input = new Input();
        this.#checkbox_wall = new CheckboxWall();
    }

    render() {
        // Main container
        let container = document.createElement("div");
        container.classList.add("grid", "grid-cols-8", "w-full", "min-h-svh");


        // Filters container
        let filter_container = document.createElement("div");
        filter_container.classList.add("flex", "flex-col", "gap-y-2", "col-span-2", "mt-4", "pt-10", "px-12", "border-r-2", "border-gray-400");

        // Filter title
        let title = document.createElement("p");
        title.classList.add("text-2xl", "font-semibold", "dark:text-white", "text-gray-900", "text-center", "pb-4");
        title.innerText = "Filters";
        filter_container.appendChild(title)

        let element_container = null;
        let label = null;
        let input = null;
        let option = null;

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
        document.body.querySelector("main").appendChild(container);


    }

    addEventListeners() {
        let main = this;
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
            console.log(res);
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

        document.addEventListener("click", function(event) {
            if (!event.target.closest("#language_input") && !event.target.closest("#autocomplete-list")) {
                document.getElementById("autocomplete-list").innerHTML = "";
                document.getElementById("autocomplete-list").classList.add("hidden");
            }

            if (!event.target.closest("#checkbox_wall")) {
                document.getElementById("checkbox_wall").classList.add("hidden");
            }
        });
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
            selector.querySelector("input").value = el.name;
            selector.querySelector("label").innerText = el.name;

            checkbox_wall.appendChild(selector);
        });
    }
}
