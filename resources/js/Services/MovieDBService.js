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
     * Get the movie using its id
     */
    getMovie(id) {
        let query = "/movie/" + id;
        return this.#makeFetch(query);
    }

    /**
     * Get the serie using its id
     */
    getSerie(id) {
        let query = "/tv/" + id;
        return this.#makeFetch(query);
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

    /**
     * Get movies similar to the given movie
     */
    async getSimilarMovies(id) {
        let query = "/movie/" + encodeURIComponent(id) + "/similar" ;
        return this.#makeFetch(query);
    }

    /**
     * Get series similar to the given serie
     */
    async getSimilarSeries(id) {
        let query = "/tv/" + encodeURIComponent(id) + "/similar" ;
        return this.#makeFetch(query);
    }

    /**
     * Return the supported languages
     */
    async getLanguages() {
        let query = "/configuration/languages";
        return this.#makeFetch(query);
    }

    /**
     * Return the supported genres
     */
    async getGenres(selector) {
        let query = null;
        if(selector) {
            query = "/genre/movie/list";
        } else {
             query = "/genre/tv/list";
        }

        return this.#makeFetch(query);
    }

    /**
     * Get the elements matching the parameters and search
     */
    async getAdvanceSearch(type, search, language, year, page) {
        let query = "/search/" + ((type == "movie") ? "movie" : "tv") + "?";
        query += "query=" + encodeURIComponent(search) + "&";
        (language != null && language != "") ? query += "language=" + encodeURIComponent(language) + "&" : null;
        (year != null && year != "") ? query += "year=" + encodeURIComponent(year) + "&" : null;
        query += "page=" + encodeURIComponent(page);
        return this.#makeFetch(query);
    }

    /**
     * Get the elements matching the filters
     */
    async getAdvanceDiscovery(type, genres, language, year, page) {
        let query = "/discover/" + ((type == "movie") ? "movie" : "tv") + "?";
        (language != null && language != "") ? query += "language=" + encodeURIComponent(language) + "&" : null;
        (year != null && year != "") ? query += "primary_release_year=" + encodeURIComponent(year) + "&" : null;
        (genres != null && genres.length != 0) ? query += "with_genres=" + encodeURIComponent(genres) + "&" : null;
        query += "page=" + encodeURIComponent(page);
        return this.#makeFetch(query);
    }
}
