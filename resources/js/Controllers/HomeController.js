import { MovieDBService } from "../Services/MovieDBService";
import { HomeView } from "../Views/HomeView";
import { Controller } from "./Controller";

/**
 * Controller class that manage the main(/) route
 */
export class HomeController extends Controller {
    #homeView;
    #movieDBApi;

    #latestMoviePage;
    #popularMoviePage;
    #latestSeriePage;
    #popularSeriePage;

    constructor() {
        super();
        this.#homeView = new HomeView();
        this.#movieDBApi = new MovieDBService();
        this.#latestMoviePage = 1;
        this.#popularMoviePage = 1;
        this.#latestSeriePage = 1;
        this.#popularSeriePage = 1;
    }

    /**
     *  Method invoked by the router that build the page and set the event listeners
     */
    start() {
        this.#homeView.render();
        this.#getCarouselElement();
    }

    async #getCarouselElement() {
        let promises = [
            await this.#movieDBApi.getLatestMovies(this.#latestMoviePage),
            await this.#movieDBApi.getPopularMovies(this.#popularMoviePage),
            await this.#movieDBApi.getOnTheAirSeries(this.#latestSeriePage),
            await this.#movieDBApi.getPopularSeries(this.#popularMoviePage),
        ]

        let result = null;
        try {
            result = await Promise.all(promises);
            // Creating carousells
            let [res1, res2, res3, res4] = await Promise.all(result.map( async el => {
                return await el.json();
            }));

            this.#homeView.addLatestMoviesCarousel(res1.results);
            this.#homeView.addPopularMoviesCarousel(res2.results);
            this.#homeView.addOnAirSeriesCarousel(res3.results);
            this.#homeView.addPopularSeriesCarousel(res4.results);
        } catch(err) {
            console.log(err);
        }
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
}
