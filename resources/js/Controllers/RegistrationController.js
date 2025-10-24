import { Navbar } from "../navbar";
import { Router } from "../router";
import { SPAFetchService } from "../Services/SPAFetchService";
import { RegisterView } from "../Views/RegisterView";
import { Controller } from "./Controller";

/**
 * Controller class that manage the registration route
 */
export class RegistrationController extends Controller {
    #registerView;
    #router;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#registerView = new RegisterView();
        this.#router = Router.getInstance();
    }

    /**
     * Method invoked by the router that build the page and set the event listeners
     */
    start() {
        (new Navbar()).changeSelectedNavbarLink("register");

        this.#registerView.render();
        this.#registerView.addEventListeners(this.#registerFormHandler.bind(this));
    }

    /**
     * Method invoked by the router when the route is changed
     */
    destroy() {
        this.#registerView.resetView();
    }

    /**
     * Callback function for the registration form
     *
     * Execute a fetch using SPAFetchService and register the user
     */
    async #registerFormHandler(event) {
        event.preventDefault();
        let sap_fetch = await SPAFetchService.getInstance();

        // Resetting error fields
        this.#registerView.resetErrorFields();

        // Fetching
        let formData = new FormData(document.getElementById("registration_form"));

        let res = await sap_fetch.POSTFetchForm('/spa/register', formData);
        let payload = await res.json();

        //Handling errors
        if(res.status == 429) {
            //Too many request
            this.#registerView.globalErrorField("Too many attempts! Try again later!");
        } else if(res.status == 422) {
            //Validation errors
            Object.keys(payload.errors).forEach(el => {
                this.#registerView.inputErrorField(el + "_input", payload.errors[el]);
            });
        } else if(res.status == 400 && payload.error) {
            this.#registerView.inputErrorField("confirm_password_input", payload.error)
        } else if(res.status == 200) {
            this.#router.overridePath({}, "/");
        } else {
            this.#registerView.globalErrorField("Ops! Something whent wrong!");
        }
    }
}
