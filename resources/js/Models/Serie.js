import { MovieSerieInterface } from "./MovieSerieInterface";

export class Serie extends MovieSerieInterface {
    #serieJson

    constructor(serieJson) {
        super();
        this.#serieJson = serieJson;
    }

    getId() {
        return this.#serieJson.id;
    }

    getBGImageSrc() {
        return this.#serieJson.backdrop_path;
    }

    getPosterImageSrc() {
        return this.#serieJson.poster_path;
    }

    getReleaseDate() {
        // return this.#serieJson.first_air_date;
        const raw = this.#serieJson.first_air_date;
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
        return this.#serieJson.episode_run_time;

    }

    getScore() {
        return Number(this.#serieJson.vote_average.toFixed(1));
    }

    getTrama() {
        return this.#serieJson.overview;
    }

    getGenres() {
        return this.#serieJson.genres.map(el => {
            return el.name;
        });
    }

    getTitle() {
        return this.#serieJson.name;
    }

    getStatus() {
        return this.#serieJson.status;
    }

    getAdult() {
        return this.#serieJson.adult;
    }

    getLanguage() {
        return this.#serieJson.original_language;
    }

    getProductionCompanies() {
        return this.#serieJson.production_companies.map(el => el.name);
    }

    getCreator() {
        return this.#serieJson.created_by.map(el => el.name);
    }

    getNumberOfSeasons() {
        return this.#serieJson.number_of_seasons;
    }

    getNumberOfEpisodes() {
        return this.#serieJson.number_of_episodes;
    }

    getSeasons() {
        return this.#serieJson.seasons;
    }
}
