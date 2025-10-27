import { Language } from "../Models/Language";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";
import { Navbar } from "../navbar";
import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { ArchiveView } from "../Views/ArchiveView";
import { Controller } from "./Controller";

/**
 * Class controller that manage the archive section page
 */
export class ArchiveController extends Controller {
    #archiveView;
    #movieDB;
    #searchPage;
    #totalSearchPage;
    #router

    /**
     * Constructor
     */
    constructor() {
        super();
        this.#archiveView = new ArchiveView();
        this.#movieDB = MovieDBService.getInstance();
        this.#router = Router.getInstance();
        this.#searchPage = 1;
        this.#totalSearchPage = 2;
    }

    /**
     * Start method invoked by the router that initialize the page
     */
    async start() {
        (new Navbar()).changeSelectedNavbarLink("archive");

        await this.#archiveView.render(this.#advanceSearchHandle.bind(this), this.#router.getState());
        this.#archiveView.setLanguageList(this.#languageListHandler.bind(this));
        this.#archiveView.setGenresList(this.#genreListHandler.bind(this));
        this.#archiveView.addEventListeners(
            this.#advanceSearchHandle.bind(this),
            this.#movieClickHandler.bind(this),
            this.#serieClickHandler.bind(this),
        );
    }

    /**
     * Destroy method invoked by the router when changing route
     */
    destroy() {
        this.#archiveView.resetView();
    }

    /**
     * Return language list from the TMDB api
     */
    async #languageListHandler() {
        let res = await this.#movieDB.getLanguages();
        let languages = (await res.json()).map(el => {
            let lang = new Language(el);
            return [lang.getIso(), lang.getEnglishName()];
        });
        return languages;
    }

    /**
     * Return list of the supported genres from TMDB api
     */
    async #genreListHandler(selector) {
        let res = await this.#movieDB.getGenres(selector);
        let genres = (await res.json()).genres;
        return genres;
    }

    /**
     * Manage the advanced search to TMDB api
     */
    async #advanceSearchHandle(json, reset = false) {
        if(reset) {
            this.#searchPage = 1;
        }
        if(this.#totalSearchPage <= this.#searchPage) {
            return false;
        }
        let res = null;
        let elements = null;
        if(typeof json.search === "string" && json.search.trim() === "") {
            res = await this.#movieDB.getAdvanceDiscovery(json.type, json.genres, json.language, json.year, this.#searchPage);
            elements = await res.json();
        } else {
            res = await this.#movieDB.getAdvanceSearch(json.type, json.search, json.language, json.year, this.#searchPage);
            elements = await res.json();
            if(json.genres.length != 0) {
                elements.results = elements.results.filter(el => {
                    for(let i=0; i<el.genre_ids.length; i++) {
                        for(let j=0; j<json.genres.length; j++) {
                            if(el.genre_ids[i] == json.genres[j]) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            }
        }

        this.#totalSearchPage = res.total_pages;
        this.#searchPage += 1;
        if(json.type == "movie") {
            return elements.results.map(el => new Movie(el));
        } else {
            return elements.results.map(el => new Serie(el));
        }
    }

    /**
     * Handler used to navigate to the detail page of a movie
     */
    #movieClickHandler(id) {
        let status = {
            'type': 'movie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }

    /**
     * Handler used to navigate to the detail page of a serie
     */
    #serieClickHandler(id) {
        let status = {
            'type': 'serie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail");
    }
}
