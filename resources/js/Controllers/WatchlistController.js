import { Controller } from "./Controller";
import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { DetailView } from "../Views/DetailView";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { WatchlistView } from "../Views/WatchlistView";

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
    start() {
        //console.log("AAA")
        this.#WatchlistView.render();

    }
}
