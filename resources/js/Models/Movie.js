import { MovieSerieInterface } from "./MovieSerieInterface";

export class Movie extends MovieSerieInterface {
    #movieJson

    constructor(movieJson) {
        super();
        this.#movieJson = movieJson;
    }

    getBGImageSrc() {
        return this.#movieJson.backdrop_path;
    }

    getPosterImageSrc() {
        return this.#movieJson.poster_path;
    }

    getReleaseDate() {
        return this.#movieJson.release_date;
    }

    getDuration() {
        return this.#movieJson.runtime;
    }

    getScore() {
        return Number(this.#movieJson.vote_average.toFixed(1));
    }

    getTrama() {
        return this.#movieJson.overview;
    }

    getGenres() {
        return this.#movieJson.genres.map(el => {
            return el.name;
        });
    }
}
