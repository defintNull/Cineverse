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

    #movieDBApi;
    #latestMoviePage;

    constructor() {
        super();
        this.#WatchlistView = new WatchlistView();
        this.#router = Router.getInstance();
        // di test
        this.#movieDBApi = MovieDBService.getInstance();
        this.#latestMoviePage = 1;
    }
    /**
     * Method invoked by the router that build the page and set the event listeners
     */

    async start() {

        //console.log("AAA")
        this.#WatchlistView.render();
        this.#WatchlistView.populatewatchlistelement(this.#loadwatchlists.bind(this));



    }

        async #getLatestMovies() {
        let res = await this.#movieDBApi.getLatestMovies(this.#latestMoviePage);
        if(res.status == 200) {
            this.#latestMoviePage += 1;
            return res.json();
        }
        return false;
    }


    async #loadwatchlists() {
        let sap_fetch = await SPAFetchService.getInstance();
        let res = await sap_fetch.GETFetch('/spa/watchlist/index', null);
        let payload = await res.json();


        //TEST INSERIMENTO

        let res1 = await this.#getLatestMovies(); //per test
        console.log(payload);
        payload.watchlists[1].movies = res1;
        let sap_post = await SPAPostService.getInstance();
        let res2 = await sap_post.POSTFetch('/spa/watchlist/update/${payload.watchlists[1].id}', null);

        console.log(payload.watchlists[1]);
        return payload.watchlists;
    }
}
