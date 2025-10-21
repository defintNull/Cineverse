import { Router } from "./router";
import { AuthService } from "./Services/AuthService";

export class Navbar {
    static #instance;
    #navbar;
    #authService;
    #router

    constructor() {
        if(Navbar.#instance) {
            return Navbar.#instance;
        }
        Navbar.#instance = this;
        this.#navbar = document.getElementById("navbar")
        this.#authService = AuthService.getInstance();
        this.#router = Router.getInstance();
    }

    /**
     * Get the instance implementing the singleton pattern
     */
    static getInstance() {
        if(Navbar.#instance == null) {
            Navbar.#instance = new Navbar();
        }

        return Navbar.#instance;
    }

    render() {
        this.#enableAuthnavbar(this.#authService.checkAuth());
    }

    changeSelectedNavbarLink(id) {
        this.#navbar.querySelector("p.border-b-2").classList.remove("border-b-2");
        let button = document.getElementById("navbar_" + id);
        if(button == null) {
            return false;
        }
        button.classList.add("border-b-2");
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

    #enableAuthnavbar(bool) {
        if(bool) {
            this.#navbar.querySelector("div").querySelectorAll("div").forEach(el => {
                el.classList.remove("hidden");
            });
        }
    }
}
