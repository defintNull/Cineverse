import { Group } from "../Models/Group";
import { SPAFetchService } from "../Services/SPAFetchService";
import { GroupView } from "../Views/GroupView";
import { Controller } from "./Controller";

export class GroupController extends Controller {
    #groupView;
    #spa_fetch;

    constructor() {
        super();
        this.#groupView = new GroupView();
    }

    async start() {
        this.#groupView.render();
        this.#spa_fetch = await SPAFetchService.getInstance();
        Promise.all([
            this.#groupView.renderMyGroups(this.#getMyGroups.bind(this)),
            this.#groupView.renderGroups(this.#getOtherGroups.bind(this)),
        ]);
        this.#groupView.addEventListeners();
    }

    destroy() {

    }

    async #getMyGroups() {
        let res = await this.#spa_fetch.GETFetch('spa/group/index', {});
        let json = await res.json();
        let groups = json.groups;
        groups = groups.map(el => new Group(el));
        return groups;
    }

    async #getOtherGroups() {
        let res = await this.#spa_fetch.GETFetch('spa/group/findothergroups', {});
        let json = await res.json();
        console.log(json);
        let groups = json.groups;
        groups = groups.map(el => new Group(el));
        return groups;
    }
}
