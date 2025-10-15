import { RegisterView } from "../Views/RegisterView";
import { Controller } from "./Controller";

export class RegistrationController extends Controller {
    #registerView;

    constructor() {
        super();
        this.#registerView = new RegisterView();
    }

    start() {
        this.#registerView.render();
    }
}
