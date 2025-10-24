import { Model } from "./Model";

/**
 * Comment Model
 */
export class Comment extends Model {
    #commentJson

    /**
     * Constructor
     */
    constructor(commentJson) {
        super();
        this.#commentJson = commentJson;
    }

    getContent() {
        return this.#commentJson.content;
    }

    getUserUsername() {
        return this.#commentJson.user.username;
    }

    getUserPropicSrc() {
        return this.#commentJson.user.propic;
    }
}
