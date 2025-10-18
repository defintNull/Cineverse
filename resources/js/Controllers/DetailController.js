import { Controller } from "./Controller";
import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { DetailView } from "../Views/DetailView";
import { Movie } from "../Models/Movie";
import { Serie } from "../Models/Serie";

export class DetailController extends Controller {
    #state;
    #router;
    #element;
    #movieDB;
    #detailView

    constructor() {
        super();
        this.#router = Router.getInstance();
        this.#state = this.#router.getState();
        this.#movieDB = MovieDBService.getInstance();
        this.#detailView = new DetailView();
    }

    async start() {
        if (this.#state.type && this.#state.type == "movie") {
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
                this.#detailView.addEventListeners(this.#movieClickHandler.bind(this));
            }
        } else if (this.#state.type && this.#state.type == "serie") {
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
                this.#detailView.addEventListeners(this.#serieClickHandler.bind(this));
            }
        } else {
            this.#router.overridePath({}, "/");
        }
    }

    destroy() {
        document.body.querySelector("main").innerHTML = "";
    }

    async #getSimilarMovies(id) {
        let response = await this.#movieDB.getSimilarMovies(id);
        if (response.status == 200) {
            let movies = (await response.json()).results;
            movies = movies.map(el => new Movie(el));
            return movies;
        }

        return false;
    }

    async #getSimilarSeries(id) {
        let response = await this.#movieDB.getSimilarSeries(id);
        if (response.status == 200) {
            let series = (await response.json()).results;
            series = series.map(el => new Movie(el));
            return series;
        }

        return false;
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
