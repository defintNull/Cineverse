import { Model } from "./Model";

export class Language extends Model {
    #language

    constructor(language) {
        super();
        this.#language = language;
    }

    getIso() {
        return this.#language.iso_639_1;
    }

    getEnglishName() {
        return this.#language.english_name;
    }

    getName() {
        return this.#language.name;
    }

}
