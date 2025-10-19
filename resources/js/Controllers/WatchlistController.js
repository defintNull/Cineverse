import { Controller } from "./Controller";
import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { DetailView } from "../Views/DetailView";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { WatchlistView } from "../Views/WatchlistView";
import { SPAFetchService } from "../Services/SPAFetchService";

export class WatchlistController extends Controller {
    #WatchlistView;
    #router;


    constructor() {
        super();
        this.#WatchlistView = new WatchlistView();
        this.#router = Router.getInstance();
    }
    /**
     * Method invoked by the router that build the page and set the event listeners
     */

    async start() {

        //console.log("AAA")
        this.#WatchlistView.render();
        let res = await this.#loadwatchlists();


    }

    async #loadwatchlists() {
        let sap_fetch = await SPAFetchService.getInstance();
        let res = await sap_fetch.GETFetch('/spa/watchlist/index', {});
        let payload = await res.json();
        console.log(payload.watchlists);
    }
}
