import { Router } from "../router";
import { MovieDBService } from "../Services/MovieDBService";
import { HomeView } from "../Views/HomeView";
import { Controller } from "./Controller";

/**
 * Controller class that manage the main(/) route
 */
export class HomeController extends Controller {
    #homeView;
    #movieDBApi;
    #router

    #latestMoviePage;
    #popularMoviePage;
    #latestSeriePage;
    #popularSeriePage;

    constructor() {
        super();
        this.#homeView = new HomeView();
        this.#movieDBApi = new MovieDBService();
        this.#router = Router.getInstance();
        this.#latestMoviePage = 1;
        this.#popularMoviePage = 1;
        this.#latestSeriePage = 1;
        this.#popularSeriePage = 1;
    }

    /**
     *  Method invoked by the router that build the page and set the event listeners
     */
    async start() {
        this.#homeView.render();
        let res = await this.#populateCarouselElement();
        if(res != false) {
            this.#homeView.addEventListeners(
                res[0], res[1], res[2], res[3],
                this.getLatestMovies.bind(this),
                this.getPopulartMovies.bind(this),
                this.getOnTheAirSeries.bind(this),
                this.getPopularSeries.bind(this),
                this.movieClickHandler.bind(this),
                this.serieClickHandler.bind(this)
            );
        }

    }

    destroy() {
        document.body.querySelector("main").innerHTML = "";
    }

    async #populateCarouselElement() {
        let promises = [
            await this.getLatestMovies(),
            await this.getPopulartMovies(),
            await this.getOnTheAirSeries(),
            await this.getPopularSeries(),
        ]

        let result = null;
        try {
            let [res1, res2, res3, res4] = await Promise.all(promises);

            // Creating carousells
            this.#homeView.addBGImage(MovieDBService.getImageSrc('original', res2.results[0].backdrop_path));

            this.#homeView.addLatestMoviesCarousel();
            this.#homeView.addLatestMoviesCarouselElements(res1.results.slice(0, Math.floor(res1.results.length / 2)))
            this.#homeView.addPopularMoviesCarousel();
            this.#homeView.addPopularMoviesCarouselElements(res2.results.slice(0, Math.floor(res2.results.length / 2)));
            this.#homeView.addOnAirSeriesCarousel();
            this.#homeView.adOdnAirSeriesCarouselElements(res3.results.slice(0, Math.floor(res3.results.length / 2)));
            this.#homeView.addPopularSeriesCarousel();
            this.#homeView.addPopularSeriesCarouselElements(res4.results.slice(0, Math.floor(res4.results.length / 2)));

            return [
                res1.results.slice(Math.floor(res1.results.length / 2), res1.results.length),
                res2.results.slice(Math.floor(res2.results.length / 2), res2.results.length),
                res3.results.slice(Math.floor(res3.results.length / 2), res3.results.length),
                res4.results.slice(Math.floor(res4.results.length / 2), res4.results.length)
            ];
        } catch(err) {
            console.log(err);
        }
        return false;
    }

    async getLatestMovies() {
        let res = await this.#movieDBApi.getLatestMovies(this.#latestMoviePage);
        if(res.status == 200) {
            this.#latestMoviePage += 1;
            return res.json();
        }
        return false;
    }

    async getPopulartMovies() {
        let res = await this.#movieDBApi.getPopularMovies(this.#popularMoviePage);
        if(res.status == 200) {
            this.#popularMoviePage += 1;
            return res.json();
        }
        return false;
    }

    async getOnTheAirSeries() {
        let res = await this.#movieDBApi.getOnTheAirSeries(this.#latestSeriePage);
        if(res.status == 200) {
            this.#latestSeriePage += 1;
            return res.json();
        }
        return false;
    }

    async getPopularSeries() {
        let res = await this.#movieDBApi.getPopularSeries(this.#popularMoviePage);
        if(res.status == 200) {
            this.#popularSeriePage += 1;
            return res.json();
        }
        return false;
    }

    movieClickHandler(id) {
        let status = {
            'type': 'movie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail")
    }

    serieClickHandler(id) {
        let status = {
            'type': 'serie',
            'id': id
        }
        this.#router.setNextPath(status, "/detail")
    }
}
