import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { Input } from "../Components/Input";
import { InputError } from "../Components/InputError";
import { View } from "./View";
import { SPAFetchService } from "../Services/SPAFetchService";
import { ImageInput } from "../Components/ImageInput";

/**
 * View class that manages the profile editing page with thematic separation
 */
export class ProfileView extends View {
    #card;
    #input;
    #button;
    #input_error;
    #imageInput;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#card = new Card();
        this.#input = new Input();
        this.#button = new Button();
        this.#input_error = new InputError();
        this.#imageInput = new ImageInput();
    }

    /**
     * Method to render the page structure
     */
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
        let sectionTitle = document.createElement("h3");
        sectionTitle.classList.add("text-xl", "font-semibold", "text-gray-800", "dark:text-white", "border-b", "pb-2", "mb-4");
        sectionTitle.innerText = "Informazioni di accesso";
        form.appendChild(sectionTitle);
        ["username", "email"].forEach(field => { //ho tolto password (da rivedere il meccanismo di cambio password)
            this.#appendInput(form, field, this.#getLabel(field), this.#getPlaceholder(field), this.#getType(field));
        });

        // Sezione: Informazioni personali
        this.#addSectionTitle(form, "Informazioni personali");
        let lastSectionTitle = form.querySelector("h3:last-of-type");
        if (lastSectionTitle) lastSectionTitle.classList.add("dark:text-white");
        ["name", "surname", "nationality"].forEach(field => {
            this.#appendInput(form, field, this.#getLabel(field), this.#getPlaceholder(field));
        });

        // Sezione: Preferenze
        this.#addSectionTitle(form, "Preferenze");
        let prefSectionTitle = form.querySelector("h3:last-of-type");
        if (prefSectionTitle) prefSectionTitle.classList.add("dark:text-white");

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
            <option value="1">Chiaro</option>
            <option value="0">Scuro</option>
        `;
        form.appendChild(themeSelect);

        // Profile picture
        // Campo foto profilo usando ImageInput (components)
        let imageElement = this.#imageInput.getComponentElement();
        let imageLabel = imageElement.querySelector("label");
        if (imageLabel) {
            imageLabel.innerText = "Foto profilo";
            imageLabel.setAttribute("for", "avatar_input");
        }
        let fileInput = imageElement.querySelector("input[type='file']") || imageElement.querySelector("input");
        if (fileInput) {
            fileInput.id = "avatar_input";
            fileInput.name = "propic";
            fileInput.accept = "image/*";
            fileInput.classList.add("w-full");
        }
        imageElement.classList.add("w-full", "pt-2", "pb-2");
        form.appendChild(imageElement);

        // aggiungo un campo errore specifico per l'avatar
        let avatarError = (new InputError()).getComponentElement();
        avatarError.classList.add("pt-2", "error-field");
        form.appendChild(avatarError);

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

    /**
     * Add the title for the section
     */
    #addSectionTitle(container, titleText) {
        let title = document.createElement("h3");
        title.classList.add("text-xl", "font-semibold", "text-gray-800", "border-b", "pb-2", "mb-4");
        title.innerText = titleText;
        container.appendChild(title);
    }

    /**
     * Populate the input field with the user data
     */
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

    /**
     * Get labels
     */
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

    /**
     * Get placeholder
     */
    #getPlaceholder(id) {
        return this.#getLabel(id) + "...";
    }

    /**
     * Get tipe
     */
    #getType(id) {
        if (id === "email") return "email";
        if (id === "password") return "password";
        return "text";
    }

    /**
     * Reset input error fields
     */
    resetErrorFields() {
        document.querySelectorAll('p.error-field').forEach(el => el.innerHTML = "");
        const error = document.getElementById("form_error");
        error.classList.add("hidden");
        error.innerHTML = "Ops! Qualcosa è andato storto!";
    }

    /**
     * Reset the global error field
     */
    globalErrorField(error) {
        const errorEl = document.getElementById("form_error");
        errorEl.innerHTML = error;
        errorEl.classList.remove("hidden");
    }

    /**
     * Populate a given error field
     */
    inputErrorField(id, error) {
        let field = document.getElementById(id);
        if (field != null) {
            let errorField = field.nextElementSibling;
            errorField.innerHTML = error;
        }
    }

    /**
     * Reset the view
     */
    resetView() {
        document.body.querySelector("main").innerHTML = "";
    }

    /**
     * Method to manage the event listeners
     */
    async addEventListeners(handler) {
        document.getElementById("profile_form").addEventListener("submit", handler);
        // attach username availability check when user finishes typing
        const usernameInput = document.getElementById("username_input");
        if (usernameInput) {
            // debounce helper
            let debounceTimer = null;
            usernameInput.addEventListener('input', async (ev) => {
                const value = ev.target.value.trim();
                const errorField = document.getElementById('username_input')?.nextElementSibling;

                // clear previous message
                if (errorField) {
                    errorField.innerHTML = '';
                    errorField.classList.remove('text-green-600');
                }

                if (debounceTimer) clearTimeout(debounceTimer);
                if (value.length === 0) return;

                debounceTimer = setTimeout(async () => {
                    try {
                        const spaFetch = await SPAFetchService.getInstance();
                        // build query string properly
                        const res = await spaFetch.GETFetch('/spa/profileinfo/check-username/'+value,{});

                        if (res.status && res.status !== 200) {
                            // show a non-blocking message
                            if (errorField) errorField.innerHTML = 'Impossibile verificare disponibilità.';
                            return;
                        }
                        const json = await res.json();
                        if (json.available) {
                            if (errorField) {
                                errorField.innerHTML = 'Disponibile ✅';
                                errorField.classList.add('text-green-600');
                            }
                        } else {
                            if (errorField) {
                                errorField.innerHTML = 'Nome utente già in uso';
                                errorField.classList.remove('text-red-600');
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        if (errorField) errorField.innerHTML = 'Errore nella verifica';
                    }
                }, 500); // 500ms debounce after user stops typing
            });
        }

        // attach email availability check when user finishes typing
        const emailInput = document.getElementById("email_input");
        if (emailInput) {
            let debounceTimerEmail = null;
            emailInput.addEventListener('input', async (ev) => {
                const value = ev.target.value.trim();
                const errorField = document.getElementById('email_input')?.nextElementSibling;

                // clear previous message
                if (errorField) {
                    errorField.innerHTML = '';
                    errorField.classList.remove('text-green-600');
                }

                if (debounceTimerEmail) clearTimeout(debounceTimerEmail);
                if (value.length === 0) return;

                debounceTimerEmail = setTimeout(async () => {
                    try {
                        const spaFetch = await SPAFetchService.getInstance();
                        // encode email to be URL-safe
                        const encoded = encodeURIComponent(value);
                        const res = await spaFetch.GETFetch('/spa/profileinfo/check-email/'+encoded,{});

                        if (res.status && res.status !== 200) {
                            if (errorField) errorField.innerHTML = 'Impossibile verificare disponibilit\u00e0.';
                            return;
                        }
                        const json = await res.json();
                        if (json.available) {
                            if (errorField) {
                                errorField.innerHTML = 'Disponibile \u2705';
                                errorField.classList.add('text-green-600');
                            }
                        } else {
                            if (errorField) {
                                errorField.innerHTML = 'Email gi\u00e0 in uso';
                                errorField.classList.remove('text-red-600');
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        if (errorField) errorField.innerHTML = 'Errore nella verifica';
                    }
                }, 500);
            });
        }
    }

    viewPopulateData(data) {
        document.getElementById("username_input").value = data.username || "";
        document.getElementById("email_input").value = data.email || "";
        document.getElementById("name_input").value = data.name || "";
        document.getElementById("surname_input").value = data.surname || "";
        document.getElementById("nationality_input").value = data.nationality || "";
        document.getElementById("theme_input").value = data.theme || "0";
    }
}
