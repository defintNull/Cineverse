import './bootstrap';

import { Router } from './router';

class App {
    #router;

    constructor() {
        // Getting router Instance
        this.#router = Router.getInstance();
    }

    start() {
        // Adding on change path event
        window.addEventListener('popstate', () => {
            this.#router.resolve(window.location.pathname);
        });

        // First path resolution invocation
        this.#router.resolve(window.location.pathname);
    }

    addEventListeners() {
        // Logo click event
        document.getElementById("home").addEventListener("click", () => {
            this.#router.overridePath({}, "/");
        });

        document.getElementById("navbar_home").addEventListener("click", () => {
            this.#router.setNextPath({}, "/");
        });

        document.getElementById("navbar_archive").addEventListener("click", () => {
            this.#router.setNextPath({}, "/archive");
        });

        document.getElementById("navbar_login").addEventListener("click", () => {
            this.#router.setNextPath({}, "/login");
        });

        document.getElementById("navbar_register").addEventListener("click", () => {
            this.#router.setNextPath({}, "/register");
        });
    }
}

let app = new App();
app.start();
app.addEventListeners();
