import { DebugController } from "./Controllers/DebugController";
import { HomeController } from "./Controllers/HomeController";
import { LoginController } from "./Controllers/LoginController";
import { RegistrationController } from "./Controllers/RegistrationController";
import { DetailController } from "./Controllers/DetailController";
import { ProfileController } from "./Controllers/PersonalProfileController";
import { WatchlistController } from "./Controllers/WatchlistController";
import { ArchiveController } from "./Controllers/ArchiveController";


/**
 * The class has the job to manage the routing sistem of the spa application
 */
export class Router {
    static #instance = null;
    #currentController = null;

    // Routing deinition
    routes = {
        "/": HomeController,
        "/detail": DetailController,
        "/archive": ArchiveController,
        "/debug": DebugController,
        "/login": LoginController,
        "/register": RegistrationController,
        "/profile": ProfileController,
        "/watchlists": WatchlistController,
    }

    constructor() {
        if(Router.#instance != null) {
            return Router.#instance;
        }

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
            this.#currentController.destroy();
        }

        let controller = this.routes[path];
        if(controller) {
            this.#currentController = new controller();
            this.#currentController.start();
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
