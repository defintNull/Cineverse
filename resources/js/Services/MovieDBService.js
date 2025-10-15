/**
 * Make the fetch request to the TheMovieDB API
 */
export class MovieDBService {
    static #instance = null;
    // URL to the TheMovieDB API
    #url = "https://api.themoviedb.org/3";
    // Fetch configuration to access the TheMovieDB API
    #config = {
        method: "GET",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjNlNDFhNmZiMDMzM2M0Mzg5MDM1NDE2MTQ2NGQ2MyIsIm5iZiI6MTc2MDM1OTk2NS4wNjQ5OTk4LCJzdWIiOiI2OGVjZjYxZGNhZjdiNzg2ZDYyODI0MjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Gh2i9Pp7YcT9knEuD-U2J7hkNd7jKmAiCnYyRbKyR4s",
            accept: "application/json",
        },
        body: null
    }

    constructor() {
        if(MovieDBService.#instance != null) {
            return MovieDBService.#instance;
        }

        MovieDBService.#instance = this;
    }

    /**
     * Get the instance implementing the singleton pattern
     */
    static getInstance() {
        if(MovieDBService.#instance == null) {
            MovieDBService.#instance = new MovieDBService();
        }

        return MovieDBService.#instance;
    }

    /**
     * Make the fetch to the TheMovieDB API uaing the query param
     */
    async #makeFetch(query) {
        return fetch(this.#url + "/" + query, this.#config);
    }

    static getImageSrc(res, img) {
        return "https://image.tmdb.org/t/p/" + res + "/" + img;
    }

    /**
     * Get the upcoming movies
     */
    async getLatestMovies(page) {
        let query = "/movie/upcoming?page=" + encodeURIComponent(page);
        return this.#makeFetch(query);
    }

    /**
     * Get the popular movies
     */
    async getPopularMovies(page) {
        let query = "/movie/popular?page=" + encodeURIComponent(page);
        return this.#makeFetch(query);
    }

    /**
     * Get the upcoming series
     */
    async getOnTheAirSeries(page) {
        let query = "/tv/on_the_air?page=" + encodeURIComponent(page);
        return this.#makeFetch(query);
    }

    /**
     * Get the popular series
     */
    async getPopularSeries(page) {
        let query = "/tv/popular?page=" + encodeURIComponent(page);
        return this.#makeFetch(query);
    }
}
