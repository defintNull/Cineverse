export class SAPFetchService {
    static #instance = null;
    #configGET = {
        method: "GET",
        credentials: 'include',
        headers: {
            accept: "application/json",
        },
        body: null
    };
    #configPOST = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: null
    };

    constructor() {
        if(SAPFetchService.#instance) {
            return SAPFetchService.#instance;
        }

        SAPFetchService.#instance = this;
    }

    static #getXSRFCookie() {
        let cookie = document.cookie.split(";");
        for(let i=0; i<cookie.length; i++) {
            let el = cookie[i].trim().split("=");
            if(el[0] == "XSRF-TOKEN") {
                return decodeURIComponent(el.slice(1).join("="));
            }
        }
        return false;
    }

    static async getInstance() {
        if(SAPFetchService.#instance == null) {
            let sap_fetch = new SAPFetchService();
            SAPFetchService.#instance = sap_fetch;

            await fetch('/sanctum/csrf-cookie', SAPFetchService.#instance.#configGET);
            let XSRF = SAPFetchService.#getXSRFCookie();

            sap_fetch.#configGET.headers["X-XSRF-TOKEN"] = XSRF;
            sap_fetch.#configPOST.headers["X-XSRF-TOKEN"] = XSRF;
        }

        return SAPFetchService.#instance;
    }
}
