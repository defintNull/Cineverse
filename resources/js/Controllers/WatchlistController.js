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
        //console.log("Watchlists caricate:", watchlists);

        let watchlistsWithContent = await Promise.all(
            watchlists.map(async w => {
                let items = Array.isArray(w.content) && w.content.length > 0
                    ? await this.GetEachContent(w.content) // gestisce sia Movie che Serie
                    : []; // se vuota, restituisco array vuoto

                return { watchlist: w, items };
            })
        );
        //console.log("Watchlists con contenuto caricate:", watchlistsWithContent);



        //ora ho i dati corretti ma devo capire come gestirli




        //console.log("watchlistsWithMovies:", watchlistsWithMovies);
        this.#WatchlistView.render();

        //nella parte di popolazione devo cambiare qualcosa
        const refs = await this.#WatchlistView.populateWatchlistsLayout(this.#loadwatchlists.bind(this));
        //console.log("refs", refs);
        //const refs2 = await this.#WatchlistView.renderMovies(moviez[0]); //questo va messo dinamico
        // Mostro di default la prima watchlist con i suoi film
        console.log("watchlistsWithContent before renderitems:", watchlistsWithContent.length);
        if (watchlistsWithContent.length > 0) {
        await this.#WatchlistView.renderItems(
            watchlistsWithContent[0].items,
            watchlistsWithContent[0].watchlist
        );
        }
        //Ho bisogno di passare qua anche la parte del salvataggio del db
        //per permettere di usare l'azione nel bottone
        this.#WatchlistView.addEventListeners(
            refs,
            watchlistsWithContent,
            this.#createnewwatchlist.bind(this),
            this.#movieClickHandler.bind(this),
            this.#serieClickHandler.bind(this),
            this.#updatewatchlist.bind(this),
        );

    }

    //gli devo passare l'oggeto nel payload della POSTFetch
    async #createnewwatchlist(newwatchlist) {
        let sap_fetch = await SPAFetchService.getInstance();
        let res = await sap_fetch.POSTFetch('/spa/watchlist/store', newwatchlist);
        let payload = await res.json();
        //console.log(payload.watchlists);
        return payload.watchlists;
        //al carousel va passata una watchlist
    }

        //gli devo passare l'oggeto nel payload della POSTFetch
    async #updatewatchlist(renamingwatchlist) {
        let sap_fetch = await SPAFetchService.getInstance();
        console.log("Renaming watchlist nel controller:", renamingwatchlist);
        let res = await sap_fetch.POSTFetch('/spa/watchlist/update', renamingwatchlist);
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
    //questo metodo viene chiamato per ogni watchlist e va generalizzato per film e serie
    //async GetEachContent(contentArray)
    async GetEachContent(contentArray) {
        //console.log("Array di ID film:", movies);
        // contentArray è del tipo:
    // [
    //   { type: "Movie", id: 101 },
    //   { type: "Serie", id: 107 }
    // ]

    // Primo giro: faccio le fetch in parallelo
    const responses = await Promise.all(
        contentArray.map(item => {
            if (item.type === "Movie") {
                return this.#movieDB.getMovie(item.id);
            } else if (item.type === "Serie") {
                return this.#movieDB.getSerie(item.id);
            } else {
                // fallback: ignoro o lancio errore
                return Promise.resolve(null);
            }
        })
    );

    // Secondo giro: trasformo in JSON solo le risposte valide
    const results = await Promise.all(
        responses.map(r => (r ? r.json() : null))
    );
    //console.log("Array di contenuti:", results);
    return results.filter(Boolean); // rimuovo eventuali null

        /* let res = await Promise.all(
            movies.map(element => this.#movieDB.getMovie(element))
        );
        let moviez = await Promise.all(
            res.map(element => element.json())
        );
        //console.log("Array di film:", moviez);
        return moviez; */
    }


    destroy() {
        document.body.querySelector("main").innerHTML = "";
        this.#WatchlistView.removeDocumentEventListeners();
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

}
