import { Controller } from "./Controller";
import { LoginView } from "../Views/LoginView";
import { Router } from "../router";
import { SPAFetchService } from "../Services/SPAFetchService";

export class LoginController extends Controller {

    #loginView
    #router

    constructor() {
        super();
        this.#loginView = new LoginView();
        this.#router = Router.getInstance();
    }

    start() {

        //porcata per il momment
        // document.body.querySelector('main').innerHTML = '';

        // const loginView = new LoginView();
        // loginView.createFormLogin();

        this.#loginView.render();
        this.#loginView.addEventListeners(this.#loginHandler.bind(this));
    }

    destroy() {
        this.#loginView.resetView();
    }

    async #loginHandler(event) {
        event.preventDefault();
        let sap_fetch = await SPAFetchService.getInstance();

        // Resetting error fields
        this.#loginView.resetErrorFields();

        // Fetching
        let formData = new FormData(document.getElementById("login-section"));

        let res = await sap_fetch.POSTFetch('/spa/login', formData);
        let payload = await res.json();

                //Handling errors
        if(res.status == 429) {
            //Too many request
            this.#loginView.gestisciErrori("Too many requests!");
        } else if(res.status == 422) {
            //Validation errors
            Object.keys(payload.errors).forEach(el => {
                this.#loginView.gestisciErrori(el + "_input", payload.errors[el]);
            });
        } else if(res.status == 401 && payload.access) {
            this.#loginView.gestisciErrori("Wrong username or password")
        } else if(res.status == 200) {
            this.#router.overridePath({}, "/");
        } else {
            this.#loginView.gestisciErrori("Ops! Something whent wrong!");
        }

    }
}
