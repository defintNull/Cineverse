import { Controller } from "./Controller";
import { ProfileView } from "../Views/PersonalProfileView";
import { Router } from "../router";
import { SPAFetchService } from "../Services/SPAFetchService";
import { Navbar } from "../navbar";

/**
 * Controller class that manages the profile editing route
 */
export class ProfileController extends Controller {
    #profileView;
    #router;
    #navbar;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#profileView = new ProfileView();
        this.#router = Router.getInstance();
        this.#navbar = Navbar.getInstance();
    }

    /**
     * Method invoked by the router that builds the page and sets the event listeners
     */
    start() {
        this.#navbar.changeSelectedNavbarLink("personal_profile");

        this.#profileView.render();
        (async () => {
            try {
                const spaFetch = await SPAFetchService.getInstance();
                const res = await spaFetch.GETFetch('/spa/profileinfo/index', {});

                if (res.status === 200) {
                    const payload = await res.json();
                    this.#profileView.viewPopulateData({
                        'username': payload.username ?? '',
                        'email': payload.email ?? '',
                        'name': payload.name ?? '',
                        'surname': payload.surname ?? '',
                        'nationality': payload.nationality ?? '',
                        'theme': payload.theme ?? '0'
                    });
                } else if (res.status === 401) {
                    this.#router.overridePath({}, "/login");
                } else {
                    this.#profileView.globalErrorField("Impossibile caricare i dati del profilo.");
                }
            } catch (err) {
                console.error(err);
                this.#profileView.globalErrorField("Errore di rete.");
            }
        })();
        this.#profileView.addEventListeners(this.#profileHandler.bind(this));
    }

    /**
     * Method invoked by the router when the route is changed
     */
    destroy() {
        this.#profileView.resetView();
    }

    /**
     * Callback function for the profile form
     *
     * Executes a fetch using SPAFetchService and tries to update the user profile
     */
    async #profileHandler(event) {
        event.preventDefault();
        let spa_fetch = await SPAFetchService.getInstance();

        // Resetting error fields
        this.#profileView.resetErrorFields();

        // Fetching form data
        let formData = new FormData(document.getElementById("profile_form"));

        let res = await spa_fetch.POSTFetchForm('/spa/profileinfo/update', formData);
        let payload = await res.json();

        // Handling errors
        if (res.status === 429) {
            this.#profileView.globalErrorField("Troppi tentativi! Riprova più tardi.");
        } else if (res.status === 422) {
            Object.keys(payload.errors).forEach(el => {
                this.#profileView.inputErrorField(el + "_input", payload.errors[el]);
            });
        } else if (res.status === 401) {
            this.#profileView.globalErrorField("Non autorizzato. Effettua il login.");
        } else if (res.status === 200) {
            this.#navbar.renderAvatarImage();
            this.#router.overridePath({}, "/");
            localStorage.setItem("theme", payload.theme);
            (function () {
                // localStorage stores strings: '0' = dark, '1' = light
                const theme = localStorage.getItem('theme');

                if (theme === '0' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            })();
        }
        else {
            this.#profileView.globalErrorField("Ops! Qualcosa è andato storto.");
        }
    }
}
