import { StorageService } from "./StorageService";

export class AuthService {
    static #instance = null;
    #storageService;

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

    checkAuth() {
        return this.#storageService.getData("logged") !== null ? true : false;
    }

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
