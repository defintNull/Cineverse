export class AuthService {

    static #instance = null;

    constructor() {
        if (AuthService.#instance) {
            return AuthService.#instance;
        }
        AuthService.#instance = this;
    }

    async logout(){
        localStorage.removeItem("auth_token");
    }
}
