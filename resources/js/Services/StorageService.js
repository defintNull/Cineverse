export class StorageService {
    static #instance = null;

    constructor() {
        if (StorageService.#instance) {
            return StorageService.#instance;
        }
        if(!sessionStorage.getItem("isActiveSession")) {
            localStorage.clear();
            sessionStorage.setItem("isActiveSession", true);
        }
        StorageService.#instance = this;
    }

    /**
     * Get the instance implementing the singleton pattern
     */
    static getInstance() {
        if(StorageService.#instance == null) {
            StorageService.#instance = new StorageService();
        }

        return StorageService.#instance;
    }

    setData(key, value) {
        localStorage.setItem(key, value);
    }

    getData(key) {
        return localStorage.getItem(key);
    }

    removeData(key) {
        localStorage.removeItem(key);
    }

    clearStorage() {
        localStorage.clear();
    }
}
