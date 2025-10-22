import { Group } from "../Models/Group";
import { Post } from "../Models/Post";
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
        this.#groupView.addEventListeners(
            this.#getOtherGroups.bind(this),
            this.#getGroupPosts.bind(this)
        );
    }

    destroy() {
        this.#groupView.resetView();
    }

    async #getMyGroups() {
        let res = await this.#spa_fetch.GETFetch('spa/groups/index', {});
        let json = await res.json();
        let groups = json.groups;
        groups = groups.map(el => new Group(el));
        return groups;
    }

    async #getOtherGroups(search = "") {
        let res = await this.#spa_fetch.GETFetch('spa/groups/findothergroups', {"search": search});
        let json = await res.json();
        let groups = json.groups;
        groups = groups.map(el => new Group(el));
        return groups;
    }

    async #getGroupPosts(id) {
        let res = await this.#spa_fetch.GETFetch('spa/groups/' + id + '/posts', {});
        if(res.status == 200) {
            let json = await res.json();
            let posts = json.posts;
            posts = posts.map(el => new Post(el));
            return posts;
        }
        return [];
    }
}
