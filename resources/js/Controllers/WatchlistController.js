import { Controller } from "./Controller";
import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { WatchlistView } from "../Views/WatchlistView";
import { SPAFetchService } from "../Services/SPAFetchService";
import { Navbar } from "../navbar";
import { Watchlist } from "../Models/Watchlist";
import { Serie } from "../Models/Serie";
import { Movie } from "../Models/Movie";

/**
 * Class that manage the watchlist page logic
 */
export class WatchlistController extends Controller {
    #WatchlistView;
    #router;
    #movieDB;
    #spa_fetch;

    #latestMoviePage;

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#WatchlistView = new WatchlistView();
        this.#router = Router.getInstance();
        // di test
        this.#movieDB = MovieDBService.getInstance();
        this.#latestMoviePage = 1;

    }

    /**
     * Method invoked by the router that build the page and set the event listeners
     */
    async start() {
        (new Navbar()).changeSelectedNavbarLink("watchlists");
        this.#spa_fetch = await SPAFetchService.getInstance();

        // Loading structure
        this.#WatchlistView.render();

        // Populating watchlist list AND triggering click first watchlist
        this.#WatchlistView.populateWatchlistsLayout(this.#loadwatchlists.bind(this));

        // Adding Events
        this.#WatchlistView.addEventListeners(
            this.#getEachContent.bind(this),
            this.#createnewwatchlist.bind(this),
            this.#movieClickHandler.bind(this),
            this.#serieClickHandler.bind(this),
            this.#updatewatchlist.bind(this),
            this.#deleteWatchlist.bind(this),
            this.#removeFromWatchlist.bind(this),
        );

    }

    /**
     * Clear the page when changing route
     */
    destroy() {
        this.#WatchlistView.clearView();
    }

    /**
     * Load the watchlist of the user
     */
    async #loadwatchlists() {
        let res = await this.#spa_fetch.GETFetch('/spa/watchlist/index', {});
        let payload = await res.json();
        let watchlists = payload.watchlists.map(el => new Watchlist(el));
        return watchlists;
    }

    /**
     * Retrieve movies and series from the TMDB api
     */
    async #getEachContent(contentArray) {

        // Primo giro: faccio le fetch in parallelo
        const responses = await Promise.all(
            contentArray.map(item => {
                if (item.type === "Movie") {
                    return this.#movieDB.getMovie(item.id);
                } else if (item.type === "Serie") {
                    return this.#movieDB.getSerie(item.id);
                }
            })
        );

        const results = await Promise.all(
            responses.map(r => r.json())
        );

        return results.map((element, counter) => {
            if (contentArray[counter].type === "Movie") {
                return new Movie(element);
            } else {
                return new Serie(element);
            }
        });
    }

    /**
     * Create a watchlist
     */
    async #createnewwatchlist() {
        let res = await this.#spa_fetch.POSTFetch('/spa/watchlist/store', {});
        let payload = await res.json();

        return new Watchlist(payload.watchlist);
    }

    /**
     * Handler to manage the click on movie card to reach the detail page
     */
    #movieClickHandler(id) {
        let status = {
            'type': 'movie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }

    /**
     * Handler to manage the click on serie card to reach the detail page
     */
    #serieClickHandler(id) {
        let status = {
            'type': 'serie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }

    /**
     * Update username of a watchlist
     */
    async #updatewatchlist(watchlist_id, name) {
        let res = await this.#spa_fetch.POSTFetch('/spa/watchlist/update', {'watchlist_id': watchlist_id, 'name': name});
        if(res.status == 200) {
            let payload = await res.json();

            return new Watchlist(payload.watchlist);
        } else {
            return 400;
        }
    }

    /**
     * Delete a watchlist
     */
    async #deleteWatchlist(watchlist_id) {
        let res = await this.#spa_fetch.POSTFetch('/spa/watchlist/destroy', {'watchlist_id': watchlist_id});
        if(res.status == 200) {
            return 200;
        } else {
            return 400;
        }
    }

    /**
     * Remove an element form a watchlist
     */
    async #removeFromWatchlist(watchlist_id, type, element_id) {
        let res = await this.#spa_fetch.POSTFetch('/spa/watchlist/remove', {
            'watchlist_id': watchlist_id,
            'type': type,
            'element_id': element_id,
        });

        if(res.status == 200) {
            return 200;
        } else {
            return 400;
        }
    }

}
