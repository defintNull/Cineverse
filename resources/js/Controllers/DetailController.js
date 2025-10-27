import { Controller } from "./Controller";
import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { DetailView } from "../Views/DetailView";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { SPAFetchService } from "../Services/SPAFetchService";
import { Watchlist } from "../Models/Watchlist";

/**
 * Class that manage the detail page logic
 */
export class DetailController extends Controller {
    #state;
    #router;
    #element;
    #movieDB;
    #detailView

    #spa_fectch;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#router = Router.getInstance();
        this.#state = this.#router.getState();
        this.#movieDB = MovieDBService.getInstance();
        this.#detailView = new DetailView();
    }

    /**
     * Function that manage the starting of the logic of the detail page
     */
    async start() {
        this.#spa_fectch = await SPAFetchService.getInstance();
        if (this.#state !== null && 'type' in this.#state && this.#state.type == "movie") {
            let response = await this.#movieDB.getMovie(this.#state.id);
            if (response.status == 200) {
                this.#element = new Movie(await response.json());
                this.#detailView.render(this.#element);

                // Similar movies
                let similar = await this.#getSimilarMovies(this.#element.getId());
                if(similar != false) {
                    this.#detailView.addSuggestedCarousel();
                    this.#detailView.addSuggestedCarouselElements(similar);
                }

                // Events
                this.#detailView.addEventListeners(
                    this.#element,
                    this.#movieClickHandler.bind(this),
                    this.#getWatchlistsHandler.bind(this),
                    this.#addElementToWatchlist.bind(this),
                );
            }
        } else if (this.#state !== null && 'type' in this.#state && this.#state.type == "serie") {
            let response = await this.#movieDB.getSerie(this.#state.id);
            if (response.status == 200) {
                this.#element = new Serie(await response.json());
                this.#detailView.render(this.#element);

                // Similar movies
                let similar = await this.#getSimilarSeries(this.#element.getId());
                if(similar != false) {
                    this.#detailView.addSuggestedCarousel();
                    this.#detailView.addSuggestedCarouselElements(similar);
                }

                // Events
                this.#detailView.addEventListeners(
                    this.#element,
                    this.#serieClickHandler.bind(this),
                    this.#getWatchlistsHandler.bind(this),
                    this.#addElementToWatchlist.bind(this)
                );
            }
        } else {
            this.#router.overridePath({}, "/");
        }
    }

    /**
     * Function invoked when the route is changed
     */
    destroy() {
        this.#detailView.clearView();
    }

    /**
     * Function that return the similar movies for suggestion
     */
    async #getSimilarMovies(id) {
        let response = await this.#movieDB.getSimilarMovies(id);
        if (response.status == 200) {
            let movies = (await response.json()).results;
            movies = movies.map(el => new Movie(el));
            return movies;
        }

        return false;
    }

    /**
     * Function that return the similar serie for suggestion
     */
    async #getSimilarSeries(id) {
        let response = await this.#movieDB.getSimilarSeries(id);
        if (response.status == 200) {
            let series = (await response.json()).results;
            series = series.map(el => new Movie(el));
            return series;
        }

        return false;
    }

    /**
     * Function to manage the click for detail page to the movie suggested
     */
    #movieClickHandler(id) {
        let status = {
            'type': 'movie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }

    /**
     * Function to manage the click for detail page to the serie suggested
     */
    #serieClickHandler(id) {
        let status = {
            'type': 'serie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }

    /**
     * Function to retrivie the watchlist of the user
     */
    async #getWatchlistsHandler() {
        let res = await this.#spa_fectch.GETFetch('spa/watchlist/index', {});
        if(res.status == 200) {
            let json = await res.json();
            let watchlists = json.watchlists.map(watchlist => new Watchlist(watchlist));
            return watchlists;
        } else {
            return 400;
        }
    }

    /**
     * Function to add an element to a watchlist
     */
    async #addElementToWatchlist(watchlist, type, id) {
        let res = await this.#spa_fectch.POSTFetch('spa/watchlist/addelement', {
            'watchlist': watchlist,
            'type': type,
            'element_id': id
        });
        if(res.status == 200) {
            return 200;
        } else {
            return 400;
        }
    }
}
