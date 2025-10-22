import { AddButton } from "../Components/AddButton";
import { Button } from "../Components/Button";
import { DeleteButton } from "../Components/DeleteButton";
import { GroupCard } from "../Components/GroupCard";
import { GroupComponent } from "../Components/GroupComponent";
import { HeaderComponent } from "../Components/HeaderComponent";
import { PostComponent } from "../Components/PostComponent";
import { Searchbar } from "../Components/Searchbar";
import { View } from "./View";

export class GroupView extends View {
    #groupCard;
    #button;
    #deleteButton;
    #groupComponent;
    #postComponent;
    #searchbarComponent;
    #headerComponent;
    #addButton;

    constructor() {
        super();
        this.#groupCard = new GroupCard();
        this.#button = new Button();
        this.#deleteButton = new DeleteButton();
        this.#groupComponent = new GroupComponent();
        this.#postComponent = new PostComponent();
        this.#searchbarComponent = new Searchbar();
        this.#headerComponent = new HeaderComponent();
        this.#addButton = new AddButton();
    }

    render() {
        document.body.querySelector("main").classList.add("sticky", "top-0");

        let container = document.createElement("div");
        container.classList.add("grid", "grid-cols-9", "w-full", "h-svh", "max-h-svh", "dark:bg-gray-800");

        // Sidebar
        let sidebar = document.createElement("div");
        sidebar.id = "sidebar";
        sidebar.classList.add("inner-scroll", "flex", "flex-col", "gap-y-4", "pb-12", "items-center", "col-span-2", "overflow-y-auto", "border-r-2", "border-gray-500", "px-8", "mt-6", "scrollbar", "scrollbar-thumb-gray-400", "scrollbar-track-gray-400", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        let search_container = document.createElement("div");
        search_container.classList.add("flex", "flex-col", "items-center", "w-full", "pt-6", "pb-2", "border-b", "border-gray-400", "sticky", "top-0", "dark:bg-gray-800", "bg-indigo-600");

        let title = document.createElement("p");
        title.classList.add("text-2xl", "text-gray-900", "dark:text-white", "pb-4", "font-semibold");
        title.innerText = "Group list";
        search_container.appendChild(title);

        let searchbar = this.#searchbarComponent.getComponentElement();
        searchbar.querySelector("button").remove();
        searchbar.id = "searchbar";
        searchbar.classList.add("pb-4", "w-full");
        search_container.appendChild(searchbar);

        sidebar.appendChild(search_container);

        let group_card_container = document.createElement("div");
        group_card_container.id = "group_card_container"
        group_card_container.classList.add("flex", "flex-col", "w-full", "items-center", "gap-y-5");
        sidebar.appendChild(group_card_container);


        container.appendChild(sidebar);


        // Element Container
        let element_container = document.createElement("div");
        element_container.id = "element_container";
        element_container.classList.add("inner-scroll", "flex", "flex-col", "col-span-7", "relative", "items-center", "px-12", "pb-12", "mt-6", "overflow-y-auto", "scrollbar", "scrollbar-thumb-gray-400", "scrollbar-track-gray-400", "dark:scrollbar-thumb-gray-500", "dark:scrollbar-track-gray-800");

        // Scroll container
        let scroll = document.createElement("div");
        scroll.id = "scroll";
        scroll.classList.add("flex", "flex-col", "items-center", "w-1/2", "pt-6", "gap-y-6");

        element_container.appendChild(scroll);


        container.appendChild(element_container);

        document.body.querySelector("main").appendChild(container);

    }

    addEventListeners(searchHandler, getPostsHandler) {
        let main = this;

        document.getElementById("searchbar").addEventListener("submit", async function(event) {
            event.preventDefault();

            let groups = await searchHandler(this.querySelector("input").value);

            let header = document.getElementById("element_container").querySelector("div.header");
            if(header) {
                main.#setPostStructureLayout(false);
            }

            document.getElementById("sidebar").querySelectorAll("div.group-card").forEach(el => {
                el.classList.remove("border", "border-gray-400");
                el.classList.add("shadow-xl", "dark:bg-gray-700", "bg-indigo-600");
            });

            let scroll = document.getElementById("scroll");
            scroll.innerHTML = "";
            groups.forEach(group => {
                let element = main.#groupComponent.getComponentElement();
                element.querySelector("p").innerText = group.getName();
                scroll.append(element);
            });

        });

        document.getElementById("sidebar").addEventListener("click", async function(event) {
            const group_card = event.target.closest(".group-card");
            if(group_card && this.contains(group_card)) {
                if(group_card.classList.contains("border")) {
                    group_card.classList.remove("border", "border-gray-400");
                    group_card.classList.add("shadow-xl", "dark:bg-gray-700", "bg-indigo-600");

                    document.getElementById("searchbar").requestSubmit();
                } else {
                    this.querySelectorAll("div.group-card").forEach(el => {
                        el.classList.remove("border", "border-gray-400");
                        el.classList.add("shadow-xl", "dark:bg-gray-700", "bg-indigo-600");
                    });

                    group_card.classList.remove("shadow-xl", "dark:bg-gray-700", "bg-indigo-600");
                    group_card.classList.add("border", "border-gray-400");

                    let posts = await getPostsHandler(1);

                    // Setting Post Structure layout
                    main.#setPostStructureLayout(true);

                    let scroll = document.getElementById("scroll");
                    scroll.innerHTML = "";
                    posts.forEach(post => {
                        let post_element = main.#postComponent.getComponentElement();
                        post_element.querySelector("p.username").innerText = post.getAuthorUsername();
                        post_element.querySelector("p.title").innerText = post.getTitle();
                        post_element.querySelector("p.content").innerText = post.getContent();
                        let img = post.getAuthorPropicSrc();
                        if(img !== null) {
                            let propic = post_element.querySelector("div.author-avatar > img");
                            propic.src = img;
                            post_element.querySelector("div.author-avatar > svg").classList.add("hidden");
                            propic.classList.remove("hidden");
                        }
                        scroll.appendChild(post_element);
                    });
                }
            }
        });

        document.querySelectorAll('div.inner-scroll').forEach(inner => {
            let outer = document.documentElement;
            inner.addEventListener('wheel', (e) => {
            const delta = e.deltaY;

            // Controlla se outer può scrollare nella direzione di deltaY
            const outerCanScrollUp = outer.scrollTop > 0;
            const outerCanScrollDown = outer.scrollTop + outer.clientHeight < outer.scrollHeight;

            if ((delta < 0 && outerCanScrollUp) || (delta > 0 && outerCanScrollDown)) {
                // Previeni scroll interno, lascia scorrere solo outer
                e.preventDefault();
                outer.scrollBy({ top: delta });
            }
            // else lascia scrollare il div interno
            }, { passive: false });
        });
    }

    resetView() {
        document.body.querySelector("main").classList.remove("sticky", "top-0");
        document.body.querySelector("main").innerHTML = "";
    }

    async renderMyGroups(groupHandler) {
        let groups = await groupHandler();
        let group_card_container = document.getElementById("group_card_container");
        groups.forEach(group => {
            for(let i=0; i<5; i++) {
                let element = this.#groupCard.getComponentElement();
                element.querySelector("p").innerText = group.getName();
                group_card_container.append(element);
            }
        });
    }

    async renderGroups(groupHandler) {
        let groups = await groupHandler();
        let scroll = document.getElementById("scroll");
        groups.forEach(group => {
            for(let i=0; i<5; i++) {
                let element = this.#groupComponent.getComponentElement();
                element.querySelector("p").innerText = group.getName();
                scroll.append(element);
            }
        });
    }

    #setPostStructureLayout(bool) {
        if(bool) {
            // Header
            let header = this.#headerComponent.getComponentElement();
            header.querySelector("button.red-button").innerText = "Exit";
            header.querySelector("p").innerText = "Group Title";
            header.querySelector("button.normal-button").innerText = "Get Token";
            document.getElementById("element_container").prepend(header);

            // Add button
            let add_button = this.#addButton.getComponentElement();
            let add_post = document.createElement("div");
            add_post.id = "add_post_button";
            add_post.classList.add("flex", "flex-col", "items-center", "cursor-pointer", "justify-center", "fixed", "bottom-10", "right-20", "rounded-4xl", "h-16", "w-16", "shadow-xl", "dark:bg-gray-700", "bg-indigo-600");
            add_post.appendChild(add_button);
            document.getElementById("element_container").appendChild(add_post);
        } else {
            document.getElementById("element_container").querySelector("div.header").remove();
            document.getElementById("add_post_button").remove();
        }
    }
}
