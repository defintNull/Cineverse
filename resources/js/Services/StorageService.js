export class StorageService {
    static #instance = null;

    constructor() {
        if (StorageService.#instance) {
            return StorageService.#instance;
        }
        localStorage.clear();
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
        console.log('Saving key:', key, 'value:', value);
        localStorage.setItem(key, value);
    }

    getData(key) {
        const val = localStorage.getItem(key);
        console.log('Getting key:', key, 'value:', val);
        return val;
    }

    removeData(key) {
        localStorage.removeItem(key);
    }
}
