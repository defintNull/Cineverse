import { Navbar } from "../navbar";
import { Router } from "../router";
import { AuthService } from "../Services/AuthService";
import { StorageService } from "../Services/StorageService";
import { Controller } from "./Controller";

export class LogoutController extends Controller {
    #authService;
    #storageService;
    #router;
    #navbar;

    constructor() {
        super();
        this.#authService = AuthService.getInstance();
        this.#storageService = StorageService.getInstance();
        this.#router = Router.getInstance();
        this.#navbar = Navbar.getInstance()
    }

    start() {
        this.#authService.setAuth(false);
        this.#storageService.clearStorage();

        this.#navbar.render();
        document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);

        this.#router.overridePath({}, "/");
    }
}
