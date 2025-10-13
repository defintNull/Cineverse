import { DebugController } from "./Controllers/DebugController";
import { HomeController } from "./Controllers/HomeController";

export class Router {
    static #instance = null;
    #currentController = null;
    routes = {
        "/": HomeController,
        "/debug": DebugController,
    }

    constructor() {
        if(Router.#instance != null) {
            return Router.#instance;
        }

        Router.#instance = this;
    }

    static getInstance() {
        if(Router.#instance == null) {
            Router.#instance = new Router();
        }

        return Router.#instance;
    }

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

    setNextPath(path) {
        history.pushState(path);
    }

    overridePath(path) {
        history.replaceState(path);
    }
}
