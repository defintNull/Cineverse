import { Group } from "../Models/Group";
import { Post } from "../Models/Post";
import { SPAFetchService } from "../Services/SPAFetchService";
import { GroupView } from "../Views/GroupView";
import { Controller } from "./Controller";

export class GroupController extends Controller {
    #groupView;
    #spa_fetch;

    #groupsPage;
    #postsPage;

    constructor() {
        super();
        this.#groupView = new GroupView();
        this.#groupsPage = 1;
        this.#postsPage = 1;
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
            this.#getGroupPosts.bind(this),
            this.#joinGroup.bind(this),
            this.#exitGroup.bind(this),
            this.#createGroup.bind(this),
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

    async #getOtherGroups(search = "", reset = false) {
        if(reset) {
            this.#groupsPage = 1;
        }
        let res = await this.#spa_fetch.GETFetch('spa/groups/findothergroups', {"search": search, "page": this.#groupsPage});
        let json = await res.json();
        let groups = json.groups;
        groups = groups.map(el => new Group(el));
        this.#groupsPage += 1;
        return groups;
    }

    async #getGroupPosts(id, reset = false) {
        if(reset) {
            this.#postsPage = 1;
        }
        let res = await this.#spa_fetch.GETFetch('spa/groups/' + id + '/posts', {"page": this.#postsPage});
        if(res.status == 200) {
            let json = await res.json();
            let posts = json.posts;
            posts = posts.map(el => new Post(el));
            this.#postsPage += 1;
            return posts;
        }
        return [];
    }

    async #joinGroup(id, token = null) {
        let res = await this.#spa_fetch.POSTFetch('spa/groups/join', {'id': id, 'token': token});
        if(res.status == 200) {
            let json = await res.json();
            if(json.status == 200) {
                return new Group(json.group);
            } else if(json.status == 401) {
                return 401
            }
        }

        return 400;
    }

    async #exitGroup(id) {
        let res = await this.#spa_fetch.POSTFetch('spa/groups/quit', {'id': id});
        return res.status;
    }

    async #createGroup(form) {
        let formData = new FormData(form);
        let res = await this.#spa_fetch.POSTFetchForm('spa/groups/store', formData);
        let json = await res.json();

        if(res.status == 200) {
            return new Group(json.group);
        } else if(res.status == 422) {
            return json.errors;
        } else {
            return 400;
        }
    }
}
