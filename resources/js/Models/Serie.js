import { MovieSerieInterface } from "./MovieSerieInterface";

export class Serie extends MovieSerieInterface {
    #serieJson

    constructor(serieJson) {
        super();
        this.#serieJson = serieJson;
    }

    getBGImageSrc() {
        return this.#serieJson.backdrop_path;
    }

    getPosterImageSrc() {
        return this.#serieJson.poster_path;
    }

    getReleaseDate() {
        return this.#serieJson.first_air_date;
    }

    getDuration() {
        return this.#serieJson.episode_run_time;
    }

    getScore() {
        return Number(this.#serieJson.vote_average.toFixed(1));
    }

    getTrama() {
        return this.#serieJson.overview;
    }
}
