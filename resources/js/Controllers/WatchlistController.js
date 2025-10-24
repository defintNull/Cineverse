import { Controller } from "./Controller";
import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { WatchlistView } from "../Views/WatchlistView";
import { SPAFetchService } from "../Services/SPAFetchService";
import { Navbar } from "../navbar";
import { Watchlist } from "../Models/Watchlist";
import { Serie } from "../Models/Serie";
import { Movie } from "../Models/Movie";

export class WatchlistController extends Controller {
    #WatchlistView;
    #router;
    #movieDB;
    #spa_fetch;

    #latestMoviePage;

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

    destroy() {
        this.#WatchlistView.clearView();
    }

    async #loadwatchlists() {
        let res = await this.#spa_fetch.GETFetch('/spa/watchlist/index', {});
        let payload = await res.json();
        let watchlists = payload.watchlists.map(el => new Watchlist(el));
        return watchlists;
    }

    //IMP per trasformare un array di interi di id dei film in un array di film effettivi
    //questo metodo viene chiamato per ogni watchlist e va generalizzato per film e serie
    //async GetEachContent(contentArray)
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

    async #createnewwatchlist() {
        let res = await this.#spa_fetch.POSTFetch('/spa/watchlist/store', {});
        let payload = await res.json();

        return new Watchlist(payload.watchlist);
    }

    #movieClickHandler(id) {
        let status = {
            'type': 'movie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }

    #serieClickHandler(id) {
        let status = {
            'type': 'serie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }

    //gli devo passare l'oggeto nel payload della POSTFetch
    async #updatewatchlist(watchlist_id, name) {
        let res = await this.#spa_fetch.POSTFetch('/spa/watchlist/update', {'watchlist_id': watchlist_id, 'name': name});
        if(res.status == 200) {
            let payload = await res.json();

            return new Watchlist(payload.watchlist);
        } else {
            return 400;
        }
    }

    async #deleteWatchlist(watchlist_id) {
        let res = await this.#spa_fetch.POSTFetch('/spa/watchlist/destroy', {'watchlist_id': watchlist_id});
        if(res.status == 200) {
            return 200;
        } else {
            return 400;
        }
    }

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
