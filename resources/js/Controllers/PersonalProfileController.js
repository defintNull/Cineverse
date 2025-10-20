import { Controller } from "./Controller";
import { ProfileView } from "../Views/PersonalProfileView";
import { Router } from "../router";
import { SPAFetchService } from "../Services/SPAFetchService";

/**
 * Controller class that manages the profile editing route
 */
export class ProfileController extends Controller {
    #profileView;
    #router;

    constructor() {
        super();
        this.#profileView = new ProfileView();
        this.#router = Router.getInstance();
    }

    /**
     * Method invoked by the router that builds the page and sets the event listeners
     */
    start() {
        if (localStorage.getItem("auth_token") === null) {
            this.#router.overridePath({}, "/login");
            return;
        }

        this.#profileView.render();
        // this.#profileView.viewPopulateData({
        //     'username': 'gerry.scotti',
        //     'email':  'gerry.scotti@mediaset.it',
        //     'name': 'Gerry',
        //     'surname': 'Scotti',
        //     'nationality': 'Italy'
        // });
        (async () => {
            try {
                const spaFetch = await SPAFetchService.getInstance();
                const res = await spaFetch.GETFetch('/spa/profileinfo/index', {});

                if (res.status === 200) {
                    const payload = await res.json();
                    this.#profileView.viewPopulateData({
                        'username': payload.username ?? '',
                        'email':    payload.email ?? '',
                        'name':     payload.name ?? '',
                        'surname':  payload.surname ?? '',
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

        let res = await spa_fetch.POSTFetch('/spa/profileinfo/update', formData);
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
            this.#router.overridePath({}, "/");
            localStorage.setItem("theme", payload.theme);
        } else {
            this.#profileView.globalErrorField("Ops! Qualcosa è andato storto.");
        }
    }
}
