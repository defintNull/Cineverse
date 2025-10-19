import { AuthService } from "../Services/AuthService";
import { SPAFetchService } from "../Services/SPAFetchService";
import { Controller } from "./Controller";

export class DebugController extends Controller {
    async start() {
        let auth = AuthService.getInstance();
        console.log(auth.checkAuth());
        auth.setAuth(true);
        console.log(auth.checkAuth());
    }
}
