/**
 * Manage the fetch request to the backend in the spa
 */
export class SPAFetchService {
    static #instance = null;
    // Fetch configuration for the GET protocol
    #configGET = {
        method: "GET",
        credentials: 'include',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            accept: "application/json",
        },
        body: null
    };
    // Fetch configuration for the POST protocol
    #configPOST = {
        method: "POST",
        credentials: 'include',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
        },
        body: null
    };
    // Fetch configuration for the POST protocol with forms
    #configPOSTForm = {
        method: "POST",
        credentials: 'include',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        body: null
    };

    constructor() {
        if (SPAFetchService.#instance) {
            return SPAFetchService.#instance;
        }

        SPAFetchService.#instance = this;
    }

    /**
     * Retrieve the XSRF-TOKEN from the cookie
     */
    static #getXSRFCookie() {
        let cookie = document.cookie.split(";");
        for (let i = 0; i < cookie.length; i++) {
            let el = cookie[i].trim().split("=");
            if (el[0] == "XSRF-TOKEN") {
                return decodeURIComponent(el.slice(1).join("="));
            }
        }
        return false;
    }

    refreshXSRFCookie() {

        let XSRF = SPAFetchService.#getXSRFCookie();
        this.#configGET.headers["X-XSRF-TOKEN"] = XSRF;
        this.#configPOST.headers["X-XSRF-TOKEN"] = XSRF;
        this.#configPOSTForm.headers["X-XSRF-TOKEN"] = XSRF;
    }

    /**
     * Retrieve the instance and set the XSRF-TOOKEN for the next fetch requests
     */
    static async getInstance() {
        if (SPAFetchService.#instance == null) {
            let sap_fetch = new SPAFetchService();
            SPAFetchService.#instance = sap_fetch;

            await fetch('/sanctum/csrf-cookie', SPAFetchService.#instance.#configGET);
            let XSRF = SPAFetchService.#getXSRFCookie();

            sap_fetch.#configGET.headers["X-XSRF-TOKEN"] = XSRF;
            sap_fetch.#configPOST.headers["X-XSRF-TOKEN"] = XSRF;
            sap_fetch.#configPOSTForm.headers["X-XSRF-TOKEN"] = XSRF;

        }

        return SPAFetchService.#instance;
    }

    /**
     * Make a fetch request using the post protocol
     */
    async POSTFetch(path, payload) {
        if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
            throw new TypeError('Payload must be a non-null object.');
        }

        let config = JSON.parse(JSON.stringify(this.#configPOST));
        config.body = JSON.stringify(payload);
        return fetch(path, config).then(response => {
            return response;
        });
    }

    /**
     * Make a fetch request using the post protocol
     */
    async POSTFetchForm(path, payload) {
        if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
            throw new TypeError('Payload must be a non-null object.');
        }

        let config = JSON.parse(JSON.stringify(this.#configPOSTForm));
        config.body = payload;
        return fetch(path, config).then(response => {
            return response;
        });
    }

    /**
     * Make a fetch request using the get protocol
     */
    async GETFetch(path, payload) {
        if (typeof payload !== 'object' || payload === null) {
            throw new TypeError('Payload must be a non-null object.');
        }

        let uri = path + "?" + ((Object.keys(payload).length === 0) ? "" : new URLSearchParams(payload).toString());

        return fetch(uri, this.#configGET).then(response => {
            return response;
        });
    }
}
