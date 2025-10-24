/**
 * Class that manage the storage of the app on the browser
 */
export class StorageService {
    static #instance = null;

    /**
     * Constructor
     */
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

    /**
     * Store a data
     */
    setData(key, value) {
        localStorage.setItem(key, value);
    }

    /**
     * Retrieve a data stored
     */
    getData(key) {
        return localStorage.getItem(key);
    }

    /**
     * Remove a data stored
     */
    removeData(key) {
        localStorage.removeItem(key);
    }

    /**
     * Clear the storage
     */
    clearStorage() {
        localStorage.clear();
    }
}
