import { View } from "./View.js";
import { SPAFetchService } from "../Services/SPAFetchService.js";

export class LoginView extends View {
    createFormLogin() {
        // Crea il contenitore principale
        const loginContainer = document.createElement('form');
        loginContainer.id = 'login-section';
        loginContainer.method = 'POST';
        //   loginContainer.style.border = '1px solid #ccc';
        //   loginContainer.style.padding = '20px';
        //   loginContainer.style.width = '300px';
        //   loginContainer.style.margin = 'auto';
        //   loginContainer.style.backgroundColor = '#f0f0f0';

        // Titolo
        const titolo = document.createElement('h2');
        titolo.textContent = 'Login';
        loginContainer.appendChild(titolo);

        // Campo username
        const usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username:';
        usernameLabel.htmlFor = 'username';
        loginContainer.appendChild(usernameLabel);

        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        usernameInput.name = 'username';
        usernameInput.required = true;
        usernameInput.style.display = 'block';
        usernameInput.style.marginBottom = '10px';
        loginContainer.appendChild(usernameInput);

        // Campo password
        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Password:';
        passwordLabel.htmlFor = 'password';
        loginContainer.appendChild(passwordLabel);

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        passwordInput.name = 'password';
        passwordInput.required = true;
        passwordInput.style.display = 'block';
        //   passwordInput.style.marginBottom = '10px';
        loginContainer.appendChild(passwordInput);

        // Bottone di invio
        const loginButton = document.createElement('button');
        loginButton.textContent = 'Accedi';
        loginButton.onclick = function () {
            const username = usernameInput.value;
            const password = passwordInput.value;
            console.log('Username:', username);
            console.log('Password:', password);
            // Qui puoi aggiungere la logica di autenticazione
        };
        loginContainer.appendChild(loginButton);

        // Aggiungi la sezione al body
        document.body.querySelector('main').appendChild(loginContainer);

        loginContainer.addEventListener('submit', async function (event) {
            event.preventDefault();
            let prova = await SPAFetchService.getInstance();
            console.log(prova);
            let formData = new FormData(loginContainer);
            prova.POSTFetch('/api/login', formData).then(response => {
                console.log(response);
            })
        });
    }
}
