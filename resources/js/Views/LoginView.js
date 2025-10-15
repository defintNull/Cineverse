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

        // // Campo username
        // const usernameLabel = document.createElement('label');
        // usernameLabel.textContent = 'Username:';
        // usernameLabel.className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
        // usernameLabel.htmlFor = 'username';
        // divUsername.appendChild(usernameLabel);

        // const usernameInput = document.createElement('input');
        // usernameInput.type = 'text';
        // usernameInput.id = 'username';
        // usernameInput.name = 'username';
        // usernameInput.required = true;
        // usernameInput.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        // divUsername.appendChild(usernameInput);
        // loginContainer.appendChild(divUsername);

        // // Campo password
        // const passwordLabel = document.createElement('label');
        // passwordLabel.textContent = 'Password:';
        // passwordLabel.htmlFor = 'password';
        // loginContainer.appendChild(passwordLabel);

        // const passwordInput = document.createElement('input');
        // passwordInput.type = 'password';
        // passwordInput.id = 'password';
        // passwordInput.name = 'password';
        // passwordInput.required = true;
        // passwordInput.style.display = 'block';
        // //   passwordInput.style.marginBottom = '10px';
        // loginContainer.appendChild(passwordInput);

        // Bottone di invio

        const loginButtonComponent = new Button();
        const loginButtonElement = loginButtonComponent.getComponentElement();
        loginButtonElement.textContent = 'Accedi';
        loginButtonElement.type = 'submit';
        loginButtonElement.className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

        // const loginButton = document.createElement('button');
        // loginButton.textContent = 'Accedi';
        // loginButtonElement.addEventListener ( "click" , function (event) {
        //     event.preventDefault();
        //     const username = usernameElement.value;
        //     const password = passwordElement.value;
        //     console.log('Username:', username);
        //     console.log('Password:', password);
        // });
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
                console.log(response);
            })
        });
    }
}
