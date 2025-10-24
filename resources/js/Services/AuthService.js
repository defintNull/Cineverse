import { StorageService } from "./StorageService";

/**
 * Class that manage the Auth status for the app
 */
export class AuthService {
    static #instance = null;
    #storageService;

    /**
     * Constructor
     */
    constructor() {
        if (AuthService.#instance) {
            return AuthService.#instance;
        }
        AuthService.#instance = this;
        this.#storageService = StorageService.getInstance();
    }

    /**
     * Get the instance implementing the singleton pattern
     */
    static getInstance() {
        if(AuthService.#instance == null) {
            AuthService.#instance = new AuthService();
        }

        return AuthService.#instance;
    }

    /**
     * Check if the current user is logged
     */
    checkAuth() {
        return this.#storageService.getData("logged") !== null ? true : false;
    }

    /**
     * Set if the user is logged
     */
    setAuth(bool) {
        if(bool) {
            if(!this.#storageService.getData("logged")) {
                this.#storageService.setData("logged", true);
            }
        } else {
            if(this.#storageService.getData("logged")) {
                this.#storageService.removeData("logged");
            }
        }
    }
}
