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
        // return this.#movieJson.release_date;
        const raw = this.#movieJson.release_date;
        if (!raw) return "";
        const pad = s => String(s).padStart(2, "0");
        if (typeof raw === "string" && raw.includes("-")) {
            const parts = raw.split("-");
            if (parts.length === 3) {
                const [yyyy, mm, dd] = parts;
                return `${pad(dd)}-${pad(mm)}-${yyyy}`;
            }
        }
        const d = new Date(raw);
        if (isNaN(d)) return String(raw);
        return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
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

    getTitle() {
        return this.#movieJson.title;
    }

    getStatus() {
        return this.#movieJson.status;
    }

    getAdult() {
        return this.#movieJson.adult;
    }

    getLanguage() {
        return this.#movieJson.original_language;
    }

    getBudget() {
        return this.#movieJson.budget;
    }

    getRevenue() {
        return this.#movieJson.revenue;
    }

    getProductionCompanies() {
        return this.#movieJson.production_companies.map(el => el.name);
    }

}
