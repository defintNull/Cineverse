import { Button } from "../Components/Button";
import { DeleteButton } from "../Components/DeleteButton";
import { GroupCard } from "../Components/GroupCard";
import { GroupComponent } from "../Components/GroupComponent";
import { PostComponent } from "../Components/PostComponent";
import { View } from "./View";

export class GroupView extends View {
    #groupCard;
    #button;
    #deleteButton;
    #groupComponent;
    #postComponent;

    constructor() {
        super();
        this.#groupCard = new GroupCard();
        this.#button = new Button();
        this.#deleteButton = new DeleteButton();
        this.#groupComponent = new GroupComponent();
        this.#postComponent = new PostComponent();
    }

    render() {
        let container = document.createElement("div");
        container.classList.add("grid", "grid-cols-9", "w-full", "min-h-svh");

        // Sidebar
        let sidebar = document.createElement("div");
        sidebar.id = "sidebar";
        sidebar.classList.add("flex", "flex-col", "gap-y-4", "items-center", "col-span-2", "border-r-2", "border-gray-500", "px-8", "mt-6", "pt-6");

        let title = document.createElement("p");
        title.classList.add("text-2xl", "text-gray-900", "dark:text-white", "pb-4", "font-semibold");
        title.innerText = "Group list";
        sidebar.appendChild(title);

        container.appendChild(sidebar);


        // Element Container
        let element_container = document.createElement("div");
        element_container.classList.add("flex", "flex-col", "col-span-7", "items-center", "px-12", "mt-6");

        // Header
        let header = document.createElement('div');
        header.classList.add("w-full", "hidden", "flex", "flex-row", "items-center", "justify-between", "border-b-1", "border-gray-400", "py-4");

        let exit_group_button = this.#deleteButton.getComponentElement();
        exit_group_button.innerText = "Exit";
        header.appendChild(exit_group_button);
        let group_name = document.createElement("p");
        group_name.classList.add("text-2xl", "text-gray-900", "dark:text-white", "font-semibold");
        group_name.innerText = "Group name";
        header.appendChild(group_name);
        let create_post_button = this.#button.getComponentElement();
        create_post_button.innerText = "Create Post";
        header.appendChild(create_post_button);

        element_container.appendChild(header);

        // Scroll container
        let scroll = document.createElement("div");
        scroll.id = "scroll";
        scroll.classList.add("flex", "flex-col", "items-center", "w-1/2", "pt-6", "gap-y-6");

        // let post = this.#postComponent.getComponentElement();
        // post.querySelector("p.group-name").innerText = "Group name";
        // post.querySelector("p.username").innerText = "Username";
        // post.querySelector("p.title").innerText = "Title";
        // post.querySelector("p.content").innerText = "Content";
        // scroll.appendChild(post);

        element_container.appendChild(scroll);

        container.appendChild(element_container);

        document.body.querySelector("main").appendChild(container);

    }

    addEventListeners() {
        document.getElementById("sidebar").addEventListener("click", function(event) {
            const group_card = event.target.closest(".group-card");
            if(group_card && this.contains(group_card)) {
                this.querySelectorAll("div.group-card").forEach(el => {
                    el.classList.remove("border", "border-gray-400");
                    el.classList.add("shadow-xl", "dark:bg-gray-700", "bg-indigo-600");
                });
                group_card.classList.remove("shadow-xl", "dark:bg-gray-700", "bg-indigo-600");
                group_card.classList.add("border", "border-gray-400")
            }
        });
    }

    async renderMyGroups(groupHandler) {
        let groups = await groupHandler();
        let sidebar = document.getElementById("sidebar");
        groups.forEach(group => {
            let element = this.#groupCard.getComponentElement();
            element.querySelector("p").innerText = group.getName();
            sidebar.append(element);
        });
    }

    async renderGroups(groupHandler) {
        let groups = await groupHandler();
        let scroll = document.getElementById("scroll");
        groups.forEach(group => {
            let element = this.#groupComponent.getComponentElement();
            element.querySelector("p").innerText = group.getName();
            scroll.append(element);
        });
    }
}
