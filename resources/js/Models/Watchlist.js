import { Model } from "./Model";

export class Watchlist extends Model {
    #watchlistJson

    constructor(watchlistJson) {
        super();
        this.#watchlistJson = watchlistJson;
    }

    getId() {
        return this.#watchlistJson.id;
    }

    getName() {
        return this.#watchlistJson.name;
    }

    getContent() {
        return this.#watchlistJson.content;
    }

    checkElement(type, id) {
        return this.#watchlistJson.content.filter(el => el.type == type && el.id == id).length != 0;
    }

    contentToJson() {
        return JSON.stringify(this.#watchlistJson.content);
    }
}
