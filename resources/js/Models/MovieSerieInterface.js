import { Model } from "./Model";

/**
 * Movie serie interface to manage the common data
 */
export class MovieSerieInterface extends Model {
    constructor() {
        super();
    }

    getId() {}

    getBGImageSrc() {}

    getPosterImageSrc() {}

    getReleaseDate() {}

    getDuration() {}

    getScore() {}

    getTrama() {}

    getGenres() {}

    getTitle() {}

    getStatus() {}

    getAdult() {}

    getLanguage() {}

    getProductionCompanies() {}
}
