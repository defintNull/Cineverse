import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { Input } from "../Components/Input";
import { InputError } from "../Components/InputError";
import { View } from "./View";

/**
 * View class that manages the profile editing page with thematic separation
 */
export class ProfileView extends View {
    #card;
    #input;
    #button;
    #input_error;

    constructor() {
        super();
        this.#card = new Card();
        this.#input = new Input();
        this.#button = new Button();
        this.#input_error = new InputError();
    }

    render() {
        let card = this.#card.getComponentElement();
        card.classList.add("flex", "flex-col", "items-center", "py-12", "w-1/2", "my-12");

        let title = document.createElement("p");
        title.classList.add("font-semibold", "text-4xl", "dark:text-white", "text-gray-900", "pb-8");
        title.innerText = "Modifica Profilo";
        card.appendChild(title);

        let form = document.createElement("form");
        form.id = "profile_form";
        form.method = "POST";
        form.classList.add("max-w-md", "mx-auto", "w-full", "flex", "flex-col", "gap-y-5");
        card.appendChild(form);

        // Sezione: Informazioni di accesso
        this.#addSectionTitle(form, "Informazioni di accesso");
        ["username", "email"].forEach(field => { //ho tolto password (da rivedere il meccanismo di cambio password)
            this.#appendInput(form, field, this.#getLabel(field), this.#getPlaceholder(field), this.#getType(field));
        });

        // Sezione: Informazioni personali
        this.#addSectionTitle(form, "Informazioni personali");
        ["name", "surname", "nationality"].forEach(field => {
            this.#appendInput(form, field, this.#getLabel(field), this.#getPlaceholder(field));
        });

        // Sezione: Preferenze
        this.#addSectionTitle(form, "Preferenze");

        // Tema dell'applicazione
        let themeLabel = document.createElement("label");
        themeLabel.classList.add("text-sm", "font-medium", "text-gray-900", "dark:text-white");
        themeLabel.innerText = "Tema dell'applicazione";
        form.appendChild(themeLabel);

        let themeSelect = document.createElement("select");
        themeSelect.id = "theme_input";
        themeSelect.name = "theme";
        themeSelect.classList.add("bg-white", "border", "border-gray-300", "text-gray-900", "text-sm", "rounded-lg", "w-full", "p-2.5", "dark:bg-gray-700", "dark:border-gray-600", "dark:placeholder-gray-400", "dark:text-white");
        themeSelect.innerHTML = `
            <option value="chiaro">Chiaro</option>
            <option value="scuro">Scuro</option>
        `;
        form.appendChild(themeSelect);

        // Generi preferiti
        // let genreLabel = document.createElement("label");
        // genreLabel.classList.add("text-sm", "font-medium", "text-gray-900", "dark:text-white");
        // genreLabel.innerText = "Generi preferiti";
        // form.appendChild(genreLabel);

        // let genreContainer = document.createElement("div");
        // genreContainer.classList.add("grid", "grid-cols-2", "gap-2");

        // const genres = ["Azione", "Commedia", "Drammatico", "Fantascienza", "Horror", "Romantico"];
        // genres.forEach(genre => {
        //     let wrapper = document.createElement("label");
        //     wrapper.classList.add("flex", "items-center");
        //     wrapper.innerHTML = `<input type="checkbox" value="${genre.toLowerCase()}" name="genres" class="mr-2" /> ${genre}`;
        //     genreContainer.appendChild(wrapper);
        // });
        // form.appendChild(genreContainer);

        // Error
        let error = this.#input_error.getComponentElement();
        error.id = "form_error";
        error.classList.add("pt-6", "hidden");
        error.innerHTML = "Ops! Qualcosa è andato storto!";
        form.appendChild(error);

        // Submit Button
        let buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("flex", "flex-col", "items-end", "pt-4");
        let submitBtn = this.#button.getComponentElement();
        submitBtn.type = "submit";
        submitBtn.innerHTML = "Salva modifiche";
        buttonWrapper.appendChild(submitBtn);
        form.appendChild(buttonWrapper);

        document.body.querySelector("main").appendChild(card);
    }

    #addSectionTitle(container, titleText) {
        let title = document.createElement("h3");
        title.classList.add("text-xl", "font-semibold", "text-gray-800", "border-b", "pb-2", "mb-4");
        title.innerText = titleText;
        container.appendChild(title);
    }

    #appendInput(container, id, labelText, placeholderText, type = "text") {
        let element = this.#input.getComponentElement();
        let label = element.querySelector("label");
        label.innerHTML = labelText;
        label.setAttribute("for", `${id}_input`);
        let input = element.querySelector("input");
        input.id = `${id}_input`;
        input.name = id;
        input.type = type;
        input.placeholder = placeholderText;
        container.appendChild(element);
    }

    #getLabel(id) {
        const labels = {
            username: "Username",
            password: "Password",
            email: "Email",
            name: "Nome",
            surname: "Cognome",
            nationality: "Nazionalità"
        };
        return labels[id] || id;
    }

    #getPlaceholder(id) {
        return this.#getLabel(id) + "...";
    }

    #getType(id) {
        if (id === "email") return "email";
        if (id === "password") return "password";
        return "text";
    }

    resetErrorFields() {
        document.querySelectorAll('p.error-field').forEach(el => el.innerHTML = "");
        const error = document.getElementById("form_error");
        error.classList.add("hidden");
        error.innerHTML = "Ops! Qualcosa è andato storto!";
    }

    globalErrorField(error) {
        const errorEl = document.getElementById("form_error");
        errorEl.innerHTML = error;
        errorEl.classList.remove("hidden");
    }

    inputErrorField(id, error) {
        let field = document.getElementById(id);
        if (field != null) {
            let errorField = field.nextElementSibling;
            errorField.innerHTML = error;
        }
    }

    resetView() {
        document.body.querySelector("main").innerHTML = "";
    }

    async addEventListeners(handler) {
        document.getElementById("profile_form").addEventListener("submit", handler);
    }
}
