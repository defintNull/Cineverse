import { Navbar } from "../navbar";
import { Router } from "../router";
import { AuthService } from "../Services/AuthService";
import { StorageService } from "../Services/StorageService";
import { Controller } from "./Controller";

/**
 * Class that manage the logic for the logout
 */
export class LogoutController extends Controller {
    #authService;
    #storageService;
    #router;
    #navbar;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#authService = AuthService.getInstance();
        this.#storageService = StorageService.getInstance();
        this.#router = Router.getInstance();
        this.#navbar = Navbar.getInstance()
    }

    /**
     * Method invoked by the router to manage the logout
     */
    start() {
        this.#authService.setAuth(false);
        this.#storageService.clearStorage();

        this.#navbar.render();
        document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);

        this.#router.overridePath({}, "/");
    }
}
