import { View } from "./View.js";
import { Input } from "../Components/Input.js";
import { Button } from "../Components/Button.js";

/**
 * View class that manage the login page
 */
export class LoginView extends View {
    /**
     * Render method to print the necessary elements
     */
    render() {

        // Crea il contenitore principale
        const loginContainer = document.createElement('form');
        loginContainer.id = 'login-section';
        loginContainer.method = 'POST';
        loginContainer.className = "max-w-sm mx-auto";

        // Subtitle
        const subtitle = document.createElement("p");
        subtitle.classList.add("font-semibold", "text-2xl", "dark:text-white", "text-gray-900", "border-b", "dark:border-white", "border-gray-900", "pt-4");
        subtitle.innerText = "Log-In";
        loginContainer.appendChild(subtitle);
        loginContainer.appendChild(document.createElement("br"));

        const divUsername = document.createElement('div');
        divUsername.className = "mb-6";

        const usernameInput = new Input();
        const usernameElement = usernameInput.getComponentElement();
        usernameElement.querySelector('label').textContent = 'Username:';
        usernameElement.querySelector('label').htmlFor = 'username';
        usernameElement.querySelector('input').type = 'text';
        usernameElement.querySelector('input').id = 'username';
        usernameElement.querySelector('input').name = 'username';
        usernameElement.querySelector('input').placeholder = 'Inserisci il tuo username';
        divUsername.appendChild(usernameElement);
        loginContainer.appendChild(divUsername);

        const divPassword = document.createElement('div');
        divPassword.className = "mb-6";

        const passwordInput = new Input();
        const passwordElement = passwordInput.getComponentElement();
        passwordElement.querySelector('label').textContent = 'Password:';
        passwordElement.querySelector('label').htmlFor = 'password';
        passwordElement.querySelector('input').type = 'password';
        passwordElement.querySelector('input').id = 'password';
        passwordElement.querySelector('input').name = 'password';
        passwordElement.querySelector('input').placeholder = 'Inserisci la tua password';
        divPassword.appendChild(passwordElement);
        loginContainer.appendChild(divPassword);

        // Bottone di invio

        let divButton = document.createElement("div");
        divButton.classList.add("flex", "flex-col", "items-end", "pt-4");


        const loginButtonComponent = new Button();
        const loginButtonElement = loginButtonComponent.getComponentElement();
        loginButtonElement.textContent = 'Accedi';
        loginButtonElement.type = 'submit';
        loginButtonElement.className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";


        // Aggiungi la sezione al body
        divButton.appendChild(loginButtonElement);
        loginContainer.appendChild(divButton);
        document.body.querySelector('main').appendChild(loginContainer);
    }

    /**
     * Print error for the form element
     */
    gestisciErrori(error) {
        let passwordElement = document.getElementById("password");
        passwordElement.nextElementSibling.innerHTML = error;
    }

    /**
     * Reset the view to it's default configuration
     */
    resetView() {
        document.body.querySelector('main').innerHTML = '';
    }

    /**
     * Set the event listener for the page setting the form event listener for submit
     */
    addEventListeners(handler1) {
        let form = document.getElementById("login-section");
        form.addEventListener("submit", handler1);
    }

    /**
     * Reset the form error field
     */
    resetErrorFields() {
        let passwordElement = document.getElementById("password");
        passwordElement.nextElementSibling.innerHTML = '';
    }
}
