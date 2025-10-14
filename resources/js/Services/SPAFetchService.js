export class SPAFetchService {
    static #instance = null;
    #configGET = {
        method: "GET",
        credentials: 'include',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            accept: "application/json",
        },
        body: null
    };
    #configPOST = {
        method: "POST",
        credentials: 'include',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            // "Content-Type": "application/json",
        },
        body: null
    };

    constructor() {
        if (SPAFetchService.#instance) {
            return SPAFetchService.#instance;
        }

        SPAFetchService.#instance = this;
    }

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

    static async getInstance() {
        if (SPAFetchService.#instance == null) {
            let sap_fetch = new SPAFetchService();
            SPAFetchService.#instance = sap_fetch;

            await fetch('/sanctum/csrf-cookie', SPAFetchService.#instance.#configGET);
            let XSRF = SPAFetchService.#getXSRFCookie();

            sap_fetch.#configGET.headers["X-XSRF-TOKEN"] = XSRF;
            sap_fetch.#configPOST.headers["X-XSRF-TOKEN"] = XSRF;
        }

        return SPAFetchService.#instance;
    }

    async POSTFetch(path, payload) {
        if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
            throw new TypeError('Payload must be a non-null object.');
        }

        let config = JSON.parse(JSON.stringify(this.#configPOST));
        config.body = payload;
        return fetch(path, config).then(response => {
            return response.json();
        });
    }

    async GETFetch(path, payload) {
        if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
            throw new TypeError('Payload must be a non-null object.');
        }

        let uri = path + encodeURIComponent(payload);

        return fetch(uri, this.#configGET).then(response => {
            return response.json();
        });
    }
}
