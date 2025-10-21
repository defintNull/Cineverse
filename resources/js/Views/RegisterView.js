import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { ImageInput } from "../Components/ImageInput";
import { Input } from "../Components/Input";
import { InputError } from "../Components/InputError";
import { View } from "./View";

/**
 * View class that manage the registration page
 */
export class RegisterView extends View {
    #card;
    #input;
    #button;
    #input_error;
    #imageInput;

    constructor() {
        super();
        this.#card = new Card();
        this.#input = new Input();
        this.#button = new Button();
        this.#input_error = new InputError();
        this.#imageInput = new ImageInput();
    }

    /**
     * Render method to construct the elements for the page
     */
    render() {
        // Card element
        let card = this.#card.getComponentElement();
        card.classList.add("flex", "flex-col", "items-center", "py-12", "w-2/3", "my-12");
        let title = document.createElement("p");
        title.classList.add("font-semibold", "text-4xl", "dark:text-white", "text-gray-900", "pb-8");
        title.innerText = "Registration";
        card.appendChild(title);

        // Form
        let container = document.createElement("form");
        container.id = "registration_form";
        container.method = "POST";
        container.classList.add("w-2/3", "flex", "flex-col", "gap-y-8");
        card.appendChild(container);

        let element = null;
        let label = null;
        let input_field = null;
        let subtitle = null;

        // Subtitle
        subtitle = document.createElement("p");
        subtitle.classList.add("font-semibold", "text-2xl", "dark:text-white", "text-gray-900", "border-b", "dark:border-white", "border-gray-900", "pt-4");
        subtitle.innerText = "Your Data";
        container.appendChild(subtitle);

        //Name
        element = this.#input.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Name";
        label.setAttribute("for", "name_input");
        input_field = element.querySelector("input");
        input_field.id = "name_input";
        input_field.name = "name";
        input_field.placeholder = "Name...";
        container.appendChild(element);

        //Surname
        element = this.#input.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Surname";
        label.setAttribute("for", "surname_input");
        input_field = element.querySelector("input");
        input_field.id = "surname_input";
        input_field.name = "surname";
        input_field.placeholder = "Surname...";
        container.appendChild(element);

        //Nationality
        element = this.#input.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Nationality";
        label.setAttribute("for", "nationality_input");
        input_field = element.querySelector("input");
        input_field.id = "nationality_input";
        input_field.name = "nationality";
        input_field.placeholder = "Nationality...";
        container.appendChild(element);

        // Subtitle
        subtitle = document.createElement("p");
        subtitle.classList.add("font-semibold", "text-2xl", "dark:text-white", "text-gray-900", "border-b", "dark:border-white", "border-gray-900", "pt-4");
        subtitle.innerText = "Login informations";
        container.appendChild(subtitle);

        //Email
        element = this.#input.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Email";
        label.setAttribute("for", "email_input");
        input_field = element.querySelector("input");
        input_field.id = "email_input";
        input_field.type = "email";
        input_field.name = "email";
        input_field.placeholder = "Email...";
        container.appendChild(element);

        //Username
        element = this.#input.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Username";
        label.setAttribute("for", "username_input");
        input_field = element.querySelector("input");
        input_field.id = "username_input";
        input_field.name = "username";
        input_field.placeholder = "Username...";
        container.appendChild(element);

        //Password
        element = this.#input.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Password";
        label.setAttribute("for", "password_input");
        input_field = element.querySelector("input");
        input_field.id = "password_input";
        input_field.type = "password";
        input_field.name = "password";
        input_field.placeholder = "Password...";
        container.appendChild(element);

        //Confirm Password
        element = this.#input.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Confirm password";
        label.setAttribute("for", "confirm_password_input");
        input_field = element.querySelector("input");
        input_field.id = "confirm_password_input";
        input_field.type = "password";
        input_field.name = "confirm_password";
        input_field.placeholder = "Confirm password...";
        container.appendChild(element);

        // Profile picture
        element = this.#imageInput.getComponentElement();
        label = element.querySelector("label");
        label.innerHTML = "Profile foto picture"
        label.setAttribute("for", "profile_foto_picture_input");
        input_field = element.querySelector("input");
        input_field.id = "profile_foto_picture_input";
        input_field.name = "profile_foto_picture";
        input_field.placeholder = "Profile foto picture...";
        input_field.setAttribute("aria-describedby", "profile_foto_picture_descriptor");
        let descriptor = element.querySelector("p");
        descriptor.id = "profile_foto_picture_descriptor";
        container.appendChild(element);

        //Form Error
        element = this.#input_error.getComponentElement();
        element.id = "form_error";
        element.classList.add("pt-6", "hidden");
        element.innerHTML = "Ops! Something whent wrong!";
        container.appendChild(element);

        //Button
        let div_button = document.createElement("div");
        div_button.classList.add("flex", "flex-col", "items-end", "pt-4")
        element = this.#button.getComponentElement();
        element.type = "submit";
        element.innerHTML = "Submit";
        div_button.appendChild(element)
        container.appendChild(div_button);

        //Appending all
        document.body.querySelector("main").appendChild(card);
    }

    /**
     * Reset all the error fields of the form
     */
    resetErrorFields() {
        // Resetting error fields
        document.querySelectorAll('p.error-field').forEach(el => {
            el.innerHTML = "";
        });
        document.getElementById("form_error").classList.add("hidden");
        document.getElementById("form_error").innerHTML = "Ops! Something whent wrong!";
    }

    /**
     * Set the error message for the global error field
     */
    globalErrorField(error) {
        document.getElementById("form_error").innerHTML = error;
        document.getElementById("form_error").classList.remove("hidden");
    }

    /**
     * Set the error message for a given error field
     */
    inputErrorField(id, error) {
        let error_field = document.getElementById(id);
        if(error_field != null) {
            error_field = error_field.nextElementSibling;
            error_field.innerHTML = error;
        }
    }

    /**
     * Reset the view to its default settings
     */
    resetView() {
        document.body.querySelector("main").innerHTML = "";
    }

    /**
     * Add the event listeners of the page, add the submit event listener for the registration form
     */
    async addEventListeners(handler1) {
        document.getElementById("registration_form").addEventListener("submit", handler1);
    }
}
