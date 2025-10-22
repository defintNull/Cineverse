import { Model } from "./Model";

export class Post extends Model {
    #postJson

    constructor(postJson) {
        super();
        this.#postJson = postJson;
    }

    getAuthorUsername() {
        return this.#postJson.author.username;
    }

    getTitle() {
        return this.#postJson.title;
    }

    getContent() {
        return this.#postJson.content;
    }

    getAuthorPropicSrc() {
        return this.#postJson.author.propic;
    }
}
