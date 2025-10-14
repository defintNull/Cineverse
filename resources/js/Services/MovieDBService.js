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
        return fetch(this.#url + "/" + query, this.#config).then(res => {
            return res.json();
        });
    }

    /**
     * Get from the TheMovieDB API the films matching the given name
     */
    async getMovieByName(movie_name) {
        let query = "search/movie?query=" + encodeURIComponent(movie_name);
        return this.#makeFetch(query);
    }
}
