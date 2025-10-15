import { Router } from "../router";
import { SPAFetchService } from "../Services/SPAFetchService";
import { RegisterView } from "../Views/RegisterView";
import { Controller } from "./Controller";

export class RegistrationController extends Controller {
    #registerView;
    #router;

    constructor() {
        super();
        this.#registerView = new RegisterView();
        this.#router = Router.getInstance();
    }

    start() {
        this.#registerView.render();
        this.#registerView.addEventListeners(this.#registerFormHandler.bind(this));
    }

    destroy() {
        document.body.querySelector("main").innerHTML = "";
    }

    async #registerFormHandler(event) {
        event.preventDefault();
        let sap_fetch = await SPAFetchService.getInstance();

        // Resetting error fields
        this.#registerView.resetErrorFields();

        // Fetching
        let formData = new FormData(document.getElementById("registration_form"));

        let res = await sap_fetch.POSTFetch('/spa/register', formData);
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
