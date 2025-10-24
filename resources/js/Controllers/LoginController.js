import { Controller } from "./Controller";
import { LoginView } from "../Views/LoginView";
import { Router } from "../router";
import { SPAFetchService } from "../Services/SPAFetchService";
import { Navbar } from "../navbar";
import { AuthService } from "../Services/AuthService";
import { StorageService } from "../Services/StorageService";

/**
 * Controller class that manage the login route
 */
export class LoginController extends Controller {
    #loginView
    #router
    #authService;
    #storageService;
    #navbar;
    #spa_fetch;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#loginView = new LoginView();
        this.#router = Router.getInstance();
        this.#authService = AuthService.getInstance();
        this.#storageService = StorageService.getInstance();
        this.#navbar = Navbar.getInstance();
    }

    /**
     *  Method invoked by the router that build the page and set the event listeners
     */
    start() {
        (new Navbar()).changeSelectedNavbarLink("login");

        this.#loginView.render();
        this.#loginView.addEventListeners(this.#loginHandler.bind(this));
    }

    /**
     * Method invoked by the router when the route is changed
     */
    destroy() {
        this.#loginView.resetView();
    }

    /**
     * Callback function for the login form
     *
     * Execute a fetch using SPAFetchService and try to login the user
     */
    async #loginHandler(event) {
        event.preventDefault();
        this.#spa_fetch = await SPAFetchService.getInstance();

        // Resetting error fields
        this.#loginView.resetErrorFields();

        // Fetching
        let formData = new FormData(document.getElementById("login-section"));

        let res = await this.#spa_fetch.POSTFetchForm('/spa/login', formData);
        let payload = await res.json();

        //Handling errors
        if (res.status == 429) {
            //Too many request
            this.#loginView.gestisciErrori("Too many requests!");
        } else if (res.status == 422) {
            //Validation errors
            Object.keys(payload.errors).forEach(el => {
                this.#loginView.gestisciErrori(el + "_input", payload.errors[el]);
            });
        } else if (res.status == 401 && payload.access) {
            this.#loginView.gestisciErrori("Wrong username or password")
        } else if (res.status == 200) {
            this.#authService.setAuth(true);

            this.#spa_fetch.refreshXSRFCookie();

            this.#navbar.render();
            this.#navbar.setAvatarButtonImage(payload.img_src, payload.alt);
            this.#storageService.setData("propic_src", payload.img_src);
            this.#storageService.setData("propic_alt", payload.alt);

            // Setting theme
            this.#storageService.setData("theme", payload.theme);
            document.documentElement.classList.toggle("dark", this.#storageService.getData("theme") == 0);

            this.#router.overridePath({}, "/");
        } else {
            this.#loginView.gestisciErrori("Ops! Something whent wrong!");
        }

    }
}
