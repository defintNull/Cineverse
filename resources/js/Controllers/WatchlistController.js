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
    #element
    #movieDB;
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
    //L'idea è quella di creare
    //1) La struttura di base per le watchlist
    //2)Popolare le watchlist e mettere la struttura per la griglia perchè so quanti
    // film ci sono in ogni watchlist
    //3)Popolare la griglia con i film effettivi
    async start() {
        let watchlists = await this.#loadwatchlists();
        let watchlistsWithMovies = await Promise.all(
            watchlists.map(async w => {
                let movies = Array.isArray(w.movies) && w.movies.length > 0
                ? await this.GetEachMovie(w.movies)
                : []; // se vuota, restituisco array vuoto
                return { watchlist: w, movies };
            })
        );

        //console.log("watchlistsWithMovies:", watchlistsWithMovies);
        this.#WatchlistView.render();
        const refs = await this.#WatchlistView.populateWatchlistsLayout(this.#loadwatchlists.bind(this));
        //console.log("refs", refs);
        //const refs2 = await this.#WatchlistView.renderMovies(moviez[0]); //questo va messo dinamico
        // Mostro di default la prima watchlist con i suoi film
        if (watchlistsWithMovies.length > 0) {
        await this.#WatchlistView.renderMovies(
            watchlistsWithMovies[0].movies,
            watchlistsWithMovies[0].watchlist
        );
        }
        //Ho bisogno di passare qua anche la parte del salvataggio del db
        //per permettere di usare l'azione nel bottone
        this.#WatchlistView.addEventListeners(
            refs,
            watchlistsWithMovies,
            this.#createnewwatchlist.bind(this)
        );

    }

    /*
    async #getLatestMovies() {
        let res = await this.#movieDB.getLatestMovies(this.#latestMoviePage);
        if(res.status == 200) {
            this.#latestMoviePage += 1;
            return res.json();
        }
        return false;
    }*/

    //gli devo passare l'oggeto nel payload della POSTFetch
    async #createnewwatchlist(newwatchlist) {
        let sap_fetch = await SPAFetchService.getInstance();
        let res = await sap_fetch.POSTFetch('/spa/watchlist/store', newwatchlist);
        let payload = await res.json();
        //console.log(payload.watchlists);
        return payload.watchlists;
        //al carousel va passata una watchlist
    }

    async #loadwatchlists() {
        let sap_fetch = await SPAFetchService.getInstance();
        let res = await sap_fetch.GETFetch('/spa/watchlist/index', {});
        let payload = await res.json();
        //console.log(payload.watchlists);
        return payload.watchlists;
        //al carousel va passata una watchlist
    }

    //IMP per trasformare un array di interi di id dei film in un array di film effettivi
    async GetEachMovie(movies) {
        console.log("Array di ID film:", movies);
        let res = await Promise.all(
            movies.map(element => this.#movieDB.getMovie(element))
        );
        let moviez = await Promise.all(
            res.map(element => element.json())
        );
        //console.log("Array di film:", moviez);
        return moviez;
    }

}
