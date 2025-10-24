import { Router } from "./router";
import { AuthService } from "./Services/AuthService";
import { StorageService } from "./Services/StorageService";

/**
 * Class that manage the behaviour of the navbar
 */
export class Navbar {
    static #instance;
    #navbar;
    #authService;
    #router
    #storageService;

    /**
     * Constructor
     */
    constructor() {
        if(Navbar.#instance) {
            return Navbar.#instance;
        }
        Navbar.#instance = this;
        this.#navbar = document.getElementById("navbar")
        this.#authService = AuthService.getInstance();
        this.#router = Router.getInstance();
        this.#storageService = StorageService.getInstance();
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

    /**
     * Render the navbar
     */
    render() {
        this.#enableAuthnavbar(this.#authService.checkAuth());
    }

    /**
     * Change selected status of the navbar
     */
    changeSelectedNavbarLink(id) {
        let selected = this.#navbar.querySelector("p.border-b-2")
        if(selected) {
            selected.classList.remove("border-b-2");
        }
        let button = document.getElementById("navbar_" + id);
        if(button == null) {
            return false;
        }
        button.classList.add("border-b-2");
    }

    /**
     * Add event listeners for the navbar
     */
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

        document.getElementById("navbar_watchlists").addEventListener("click", () => {
            this.#router.setNextPath({}, "/watchlists");
        });

        document.getElementById("navbar_groups").addEventListener("click", () => {
            this.#router.setNextPath({}, "/groups");
        });

        document.getElementById("navbar_login").addEventListener("click", () => {
            this.#router.setNextPath({}, "/login");
        });

        document.getElementById("navbar_register").addEventListener("click", () => {
            this.#router.setNextPath({}, "/register");
        });

        document.getElementById("avatarButton").addEventListener("click", function() {
            document.getElementById("avatarDropdown").classList.toggle("hidden");
        });

        document.getElementById("navbar_profile").addEventListener("click", () => {
            document.getElementById("avatarDropdown").classList.add("hidden");
            this.#router.setNextPath({}, "/profile");
        });

        document.getElementById("navbar_logout").addEventListener("click", () => {
            document.getElementById("avatarDropdown").classList.add("hidden");
            this.#router.setNextPath({}, "/logout");
        });
    }

    /**
     * Enable navbar for auth user
     */
    #enableAuthnavbar(bool) {
        if(bool) {
            this.#navbar.querySelector("div").querySelectorAll("div").forEach(el => {
                el.classList.remove("hidden");
            });
            document.getElementById("navbar_authentication").classList.add("hidden");
            document.getElementById("navbar_avatar").classList.remove("hidden");
        } else {
            let separator = document.getElementById("navbar_separator");
            separator.nextElementSibling.classList.add("hidden");
            separator.classList.add("hidden");
            document.getElementById("navbar_avatar").classList.add("hidden");
            document.getElementById("avatarButton").querySelector("img").classList.add("hidden");
            document.getElementById("avatarButton").querySelector("svg").classList.remove("hidden");
            document.getElementById("navbar_authentication").classList.remove("hidden");
        }
    }

    /**
     * Set the avatar image for the auth user
     */
    setAvatarButtonImage(img_src, alt) {
        let avatar_button = document.getElementById("avatarButton")
        if(img_src === null) {
            avatar_button.querySelector("img").classList.add("hidden");
            avatar_button.querySelector("svg").classList.remove("hidden");
        } else {
            avatar_button.querySelector("svg").classList.add("hidden");
            let img_element = avatar_button.querySelector("img");
            img_element.src = img_src;
            img_element.alt = alt;
            img_element.classList.remove("hidden");
        }
    }

    /**
     * Reload the avatar propic
     */
    renderAvatarImage() {
        let propic_src = this.#storageService.getData("propic_src");
        let propic_alt = this.#storageService.getData("propic_alt");
        if(propic_src !== null && propic_src !== "null") {
            this.setAvatarButtonImage(propic_src, propic_alt);
        }
    }
}
