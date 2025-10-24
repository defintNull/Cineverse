import { Model } from "./Model";

/**
 * Profile Model
 */
class Profile extends Model {
    constructor({ id = null, username = "", email = "", name = "", surname = "", nationality = "" } = {}) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.nationality = nationality;
    }

    static fromJson(json) {
        return new Profile({
            id: json.id,
            username: json.username,
            email: json.email,
            name: json.name,
            surname: json.surname,
            nationality: json.nationality
        });
    }
    toJson() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            name: this.name,
            surname: this.surname,
            nationality: this.nationality
        };
    }
}
