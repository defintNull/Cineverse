import { Language } from "../Models/Language";
import { MovieDBService } from "../Services/MovieDBService";
import { ArchiveView } from "../Views/ArchiveView";
import { Controller } from "./Controller";


export class ArchiveController extends Controller {
    #archiveView;
    #movieDB;

    constructor() {
        super();
        this.#archiveView = new ArchiveView();
        this.#movieDB = MovieDBService.getInstance();
    }

    start() {
        this.#archiveView.render();
        this.#archiveView.setLanguageList(this.#languageListHandler.bind(this));
        this.#archiveView.setGenresList(this.#genreListHandler.bind(this));
        this.#archiveView.addEventListeners();
    }

    destroy() {
        document.body.querySelector("main").innerHTML = "";
    }

    async #languageListHandler() {
        let res = await this.#movieDB.getLanguages();
        let languages = (await res.json()).map(el => {
            let lang = new Language(el);
            return [lang.getIso(), lang.getEnglishName()];
        });
        return languages;
    }

    async #genreListHandler(selector) {
        let res = await this.#movieDB.getGenres(selector);
        let genres = (await res.json()).genres;
        return genres;
    }
}
