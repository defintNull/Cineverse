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
                this.#element = await response.json();
                this.#detailView.render(new Movie(this.#element));
            }
        } else if (this.#state.type && this.#state.type == "serie") {
            let response = await this.#movieDB.getSerie(this.#state.id);
            if (response.status == 200) {
                this.#element = await response.json();
                this.#detailView.render(new Serie(this.#element));
            }
        } else {
            this.#router.overridePath({}, "/");
        }
    }

    destroy() {
        document.body.querySelector("main").innerHTML = "";
    }
}
