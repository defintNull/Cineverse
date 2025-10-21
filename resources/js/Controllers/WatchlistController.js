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
        let moviezz = await this.#loadwatchlists()
        console.log(moviezz[0]);
        let moviez = await this.GetEachMovie(moviezz[0].movies);
        this.#WatchlistView.render();
        const refs = await this.#WatchlistView.populateWatchlistsLayout(this.#loadwatchlists.bind(this));
        console.log("refs", refs);
        const refs2 = await this.#WatchlistView.renderMovies(moviez);
        this.#WatchlistView.addEventListeners(refs);
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

    async #loadwatchlists() {
        let sap_fetch = await SPAFetchService.getInstance();
        let res = await sap_fetch.GETFetch('/spa/watchlist/index', null);
        let payload = await res.json();
        //console.log(payload.watchlists);
        return payload.watchlists;
        //al carousel va passata una watchlist
        this.#WatchlistView.addWatchlistSidebar(payload.watchlists)
        this.#WatchlistView.addWatchlistGrid(payload.watchlists[0]);
        //PER ORA HO SOLO L'ARRAY DI INTERI, MA MI SERVE UN ARRAY DI MOVIES
        res = await this.GetEachMovie(payload.watchlists[0].movies);
        //Ora che ho l'array di movies lo posso visualizzare
        this.#WatchlistView.addWatchlistGridElements(res);

        //TEST INSERIMENTO
        /*
        let res1 = await this.#getLatestMovies(); //per test
        //console.log(payload);
        payload.watchlists[1].movies = res1;

        //let payload1 = {};
        payload1.watchlist = 2;  //ID DELLA WATCHLIST A CUI AGGIUNGERE UN FILM
        payload1.movie = res1.results[0].id; //Secondo elemento della coppia, l'ID del film da aggiundere
        console.log(res1.results[0].id);
        //aggiungo il film
        //let res2 = await sap_fetch.POSTFetch('/spa/watchlist/addmovie', payload1);

        //console.log(payload.watchlists[1]);
        */
        return payload.watchlists;
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
