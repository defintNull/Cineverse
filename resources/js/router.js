import { DebugController } from "./Controllers/DebugController";
import { HomeController } from "./Controllers/HomeController";
import { LoginController } from "./Controllers/LoginController";
import { RegistrationController } from "./Controllers/RegistrationController";
import { DetailController } from "./Controllers/DetailController";
import { ProfileController } from "./Controllers/PersonalProfileController";
import { WatchlistController } from "./Controllers/WatchlistController";
import { ArchiveController } from "./Controllers/ArchiveController";
import { LogoutController } from "./Controllers/LogoutController";
import { AuthService } from "./Services/AuthService";
import { GroupController } from "./Controllers/GroupController";


/**
 * The class has the job to manage the routing sistem of the spa application
 */
export class Router {
    static #instance = null;
    #currentController = null;
    #authService;

    // Routing deinition
    routes = {
        "/": [HomeController, null],
        "/detail": [DetailController, null],
        "/archive": [ArchiveController, null],
        "/debug": [DebugController, null],
        "/login": [LoginController, null],
        "/logout": [LogoutController, "auth"],
        "/register": [RegistrationController, null],
        "/profile": [ProfileController, "auth"],
        "/watchlists": [WatchlistController, "auth"],
        "/groups": [GroupController, "auth"],
    }

    constructor() {
        if(Router.#instance != null) {
            return Router.#instance;
        }
        this.#authService = AuthService.getInstance();
        Router.#instance = this;
    }

    /**
     * Get the instance implementing the singleton pattern
     */
    static getInstance() {
        if(Router.#instance == null) {
            Router.#instance = new Router();
        }

        return Router.#instance;
    }

    /**
     * Manage the resolution of a path invoking the corresponding controller
     */
    resolve(path) {
        if(this.#currentController != null) {
            window.scrollTo({top: 0, behavior: 'smooth'});
            this.#currentController.destroy();
        }

        let route = this.routes[path];
        if(route !== undefined) {
            if(route[1] == "auth") {
                if(!this.#authService.checkAuth()) {
                    this.overridePath({}, "/");
                    return;
                }
            }
            let controller = route[0];
            if(controller) {
                this.#currentController = new controller();
                this.#currentController.start();
            }
        } else {
            window.location.href = "/404";
        }
    }

    /**
     * Push the path in the browser buffer in the last position
     */
    setNextPath(state, path) {
        history.pushState(state, "", path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    /**
     * Push the path in the browser buffer resetting it
     */
    overridePath(state, path) {
        history.replaceState(state, "", path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    /**
     * Retrieve the status of the current route
     */
    getState() {
        return history.state;
    }
}
