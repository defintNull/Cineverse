import { View } from "./View.js";
import { SPAFetchService } from "../Services/SPAFetchService.js";
import { Input } from "../Components/Input.js";
import { Card } from "../Components/Card.js";
import { Button } from "../Components/Button.js";

export class LoginView extends View {
    createFormLogin() {


        // Crea il contenitore principale
        const loginContainer = document.createElement('form');
        loginContainer.id = 'login-section';
        loginContainer.method = 'POST';

        const loginCard = new Card();
        const loginCardElement = loginCard.getComponentElement();
        loginContainer.appendChild(loginCardElement);

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
        loginCardElement.appendChild(divUsername);

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
        loginCardElement.appendChild(divPassword);

        // Bottone di invio

        const loginButtonComponent = new Button();
        const loginButtonElement = loginButtonComponent.getComponentElement();
        loginButtonElement.textContent = 'Accedi';
        loginButtonElement.type = 'submit';
        loginButtonElement.className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";


        // Aggiungi la sezione al body
        loginCardElement.appendChild(loginButtonElement);
        document.body.querySelector('main').appendChild(loginContainer);

        loginContainer.addEventListener('submit', async function (event) {
            event.preventDefault();
            console.log("login");
            console.log(usernameElement.querySelector('input').value);
            let prova = await SPAFetchService.getInstance();
            console.log(prova);
            let formData = new FormData(loginContainer);
            prova.POSTFetch('/spa/login', formData).then(response => {
                response.json();
                console.log(response);
                if (response.status != 200)
                    passwordElement.querySelector('p').textContent = "Wrong username or password";
            })
        });
    }
}
