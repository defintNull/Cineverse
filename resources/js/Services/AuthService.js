export class AuthService {
    static #instance = null;
    #logged = false;

    constructor() {
        if (AuthService.#instance) {
            return AuthService.#instance;
        }
        AuthService.#instance = this;
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

    setLogged(bool) {
        this.#logged = tru
    }

    async logout(){
        localStorage.removeItem("auth_token");
    }
}
