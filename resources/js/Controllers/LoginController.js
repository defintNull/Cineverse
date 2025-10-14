import { Controller } from "./Controller";
import { LoginView } from "../Views/LoginView";

export class LoginController extends Controller {
    start() {

        //porcata per il momment
        document.body.querySelector('main').innerHTML = '';

        const loginView = new LoginView();
        loginView.createFormLogin();
    }
}
