import './bootstrap';
import { Navbar } from './navbar';

import { Router } from './router';
import { StorageService } from './Services/StorageService';

class App {
    #router;
    #navbar;
    #storageService;

    constructor() {
        // Getting router Instance
        this.#router = Router.getInstance();
        this.#navbar = Navbar.getInstance();
        this.#storageService = StorageService.getInstance();
    }

    start() {
        this.#navbar.render();
        this.#navbar.addEventListeners();

        if(this.#storageService.getData("theme")) {
            document.documentElement.classList.toggle("dark", this.#storageService.getData("theme") == 0);
        } else {
            document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
        }

        // Adding on change path event
        window.addEventListener('popstate', () => {
            this.#router.resolve(window.location.pathname);
        });

        // First path resolution invocation
        this.#router.resolve(window.location.pathname);
    }
}

let app = new App();
app.start();
