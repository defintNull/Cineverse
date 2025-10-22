import { Model } from "./Model";

export class Group extends Model {
    #groupJson

    constructor(groupJson) {
        super();
        this.#groupJson = groupJson;
    }

    getName() {
        return this.#groupJson.name;
    }

    getId() {
        return this.#groupJson.id;
    }
}
