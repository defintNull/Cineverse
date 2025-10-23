import { AddButton } from "../Components/AddButton";
import { Button } from "../Components/Button";
import { DeleteButton } from "../Components/DeleteButton";
import { GroupCard } from "../Components/GroupCard";
import { GroupComponent } from "../Components/GroupComponent";
import { HeaderComponent } from "../Components/HeaderComponent";
import { Input } from "../Components/Input";
import { InputError } from "../Components/InputError";
import { PopUp } from "../Components/PopUp";
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
    #popup
    #input
    #inputError;

    #scrollHandle;

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
        this.#popup = new PopUp();
        this.#input = new Input();
        this.#inputError = new InputError();
    }

    render() {
        // Setting page
        document.body.querySelector("main").classList.add("sticky", "top-0");
        document.querySelector("footer").classList.add("hidden");

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
        scroll.classList.add("flex", "flex-col", "items-center", "grow", "w-1/2", "pt-6", "gap-y-6");

        element_container.appendChild(scroll);


        container.appendChild(element_container);

        document.body.querySelector("main").appendChild(container);

    }

    addEventListeners(searchHandler, getPostsHandler, joinGroupHandler) {
        let main = this;
        this.#scrollHandle = this.#addGroupScrollHandler.bind(
            this,
            document.getElementById("element_container"),
            searchHandler,
            getPostsHandler
        );

        document.getElementById("searchbar").addEventListener("submit", async function(event) {
            event.preventDefault();

            document.getElementById("element_container").addEventListener("scroll", main.#scrollHandle);

            let groups = await searchHandler(this.querySelector("input").value, true);

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
                element.querySelector("input[name='id']").value = group.getId();
                element.querySelector("input[name='description']").value = group.getDescription();
                element.querySelector("input[name='visibility']").value = group.getVisibility();
                scroll.append(element);
            });

        });

        document.getElementById("sidebar").addEventListener("click", async function(event) {
            const group_card = event.target.closest(".group-card");
            document.getElementById("element_container").addEventListener("scroll", main.#scrollHandle);
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

                    let posts = await getPostsHandler(group_card.querySelector("input").value, true);

                    // Setting Post Structure layout
                    if(!document.querySelector("div.header")) {
                        main.#setPostStructureLayout(true, group_card.querySelector("input").value);
                    }

                    let scroll = document.getElementById("scroll");
                    scroll.innerHTML = "";
                    if(posts.length != 0) {
                        posts.forEach(post => {
                            let post_element = main.#postComponent.getComponentElement();
                            post_element.querySelector("p.username").innerText = post.getAuthorUsername();
                            post_element.querySelector("p.title").innerText = post.getTitle();
                            post_element.querySelector("p.content").innerText = post.getContent();
                            post_element.querySelector("input").value = post.getId();
                            let img = post.getAuthorPropicSrc();
                            if(img !== null) {
                                let propic = post_element.querySelector("div.author-avatar > img");
                                propic.src = img;
                                post_element.querySelector("div.author-avatar > svg").classList.add("hidden");
                                propic.classList.remove("hidden");
                            }
                            scroll.appendChild(post_element);
                        });
                    } else {
                        let placehoder = document.createElement("div");
                        placehoder.classList.add("flex", "flex-col", "items-center", "justify-center", "w-full", "grow");
                        let cont = document.createElement("div");
                        cont.classList.add("w-full", "grow", "flex", "flex-col", "items-center", "justify-center");
                        let p = document.createElement("p");
                        p.classList.add("text-2xl", "font-semibold", "dark:text-white", "text-gray-900");
                        p.innerText = "Ops! No post present";
                        cont.appendChild(p);
                        p = document.createElement("p");
                        p.classList.add("text-lg", "font-semibold", "dark:text-white", "text-gray-900");
                        p.innerText = "Be the first to post someting!";
                        cont.appendChild(p);
                        placehoder.appendChild(cont);
                        scroll.appendChild(placehoder);
                    }
                }
            }
        });

        document.querySelectorAll('div.inner-scroll').forEach(inner => {
            const outer = document.documentElement;

            inner.addEventListener('wheel', (e) => {
                const delta = e.deltaY;

                const outerCanScrollUp = outer.scrollTop > 0;
                const outerCanScrollDown = outer.scrollTop + outer.clientHeight < outer.scrollHeight;

                const innerCanScrollUp = inner.scrollTop > 0;
                const innerCanScrollDown = inner.scrollTop + inner.clientHeight < inner.scrollHeight;

                if (delta > 0) {
                    // Scroll down: prima outer, poi interno
                    if (outerCanScrollDown) {
                        e.preventDefault();
                        outer.scrollBy({ top: delta });
                    }
                    // else lascia scrollare il div interno
                } else if (delta < 0) {
                    // Scroll up: prima interno, poi outer
                    if (innerCanScrollUp) {
                        // lascio scrollare il div interno (non prevengo)
                        // esci da qui per non prevenire
                        return;
                    } else if (outerCanScrollUp) {
                        // scroll outer se interno è già tutto in cima
                        e.preventDefault();
                        outer.scrollBy({ top: delta });
                    }
                    // else non faccio nulla (non scrolla)
                }
            }, { passive: false });
        });

        document.getElementById("element_container").addEventListener("scroll", this.#scrollHandle);

        // Group component event
        document.getElementById("scroll").addEventListener("click", async function(event) {
            const join_button = event.target.closest(".join");
            if(join_button && this.contains(join_button)) {
                let parent = join_button.parentElement.parentElement.parentElement
                let popup = main.#popup.getComponentElement();
                popup.querySelector("p").innerText = "Join Group";

                let container = popup.querySelector("div.container");
                container.classList.add("items-center", "gap-y-4", "py-8")
                let title = document.createElement("p");
                title.classList.add("text-2xl", "font-medium", "dark:text-white", "text-gray-900");
                title.innerText = parent.querySelector("p").innerText;
                container.appendChild(title);
                let img = document.createElement("img");
                img.classList.add("h-46");
                img.src = parent.querySelector("img").src;
                container.appendChild(img);
                let description = document.createElement("p");
                description.classList.add("text-lg", "italic", "dark:text-white", "text-gray-900");
                description.innerText = parent.querySelector("input[name='description']").value;
                container.appendChild(description);
                let id_input = document.createElement("input");
                id_input.hidden = true;
                id_input.type = "text";
                id_input.name = "group_id";
                id_input.value = parent.querySelector("input[name='id']").value;
                container.appendChild(id_input);
                if(parent.querySelector("input[name='visibility']").value == "private") {
                    let token = main.#input.getComponentElement();
                    token.querySelector("input").name = "token_input";
                    token.querySelector("label").innerText = "Token";
                    container.appendChild(token);
                }
                let error_field = main.#inputError.getComponentElement();
                error_field.id = "token_error";
                error_field.innerText = "";
                error_field.classList.add("hidden");
                container.appendChild(error_field);

                document.body.querySelector("main").appendChild(popup);


                let token = document.querySelector("input[name='token_input']");

                popup.querySelector("button.default-button").addEventListener("click", main.#joinGroupHandler.bind(main, joinGroupHandler, parent, id_input.value, token));
                popup.querySelector("button.delete-button").addEventListener("click", () => {popup.remove();});

            }
        });
    }

    resetView() {
        document.body.querySelector("main").classList.remove("sticky", "top-0");
        document.querySelector("footer").classList.remove("hidden");
        document.body.querySelector("main").innerHTML = "";
    }

    async renderMyGroups(groupHandler) {
        let groups = await groupHandler();
        let group_card_container = document.getElementById("group_card_container");
        groups.forEach(group => {
            let element = this.#groupCard.getComponentElement();
            element.querySelector("p").innerText = group.getName();
            element.querySelector("input").value = group.getId();
            let img_src = group.getImageSrc();
            if (img_src == null) {
                element.querySelector("img").classList.add("hidden");
            }
            element.querySelector("img").src = group.getImageSrc();
            group_card_container.append(element);
        });
    }

    async renderGroups(groupHandler) {
        let groups = await groupHandler();
        let scroll = document.getElementById("scroll");
        groups.forEach(group => {
            let element = this.#groupComponent.getComponentElement();
            element.querySelector("p").innerText = group.getName();
            element.querySelector("input[name='id']").value = group.getId();
            element.querySelector("input[name='description']").value = group.getDescription();
            element.querySelector("input[name='visibility']").value = group.getVisibility();
            element.querySelector("img").src = group.getImageSrc();
            scroll.append(element);
        });
    }

    #setPostStructureLayout(bool, id = null) {
        if(bool) {
            // Header
            let header = this.#headerComponent.getComponentElement();
            header.querySelector("button.red-button").innerText = "Exit";
            header.querySelector("p").innerText = "Group Title";
            header.querySelector("button.normal-button").innerText = "Get Token";
            header.querySelector("input").value = id;
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

    async #addGroupScrollHandler(container, groupHandler, postHandler) {
        // Altezza totale del contenuto scrollabile
        const scrollHeight = container.scrollHeight;
        // Altezza visibile del div
        const clientHeight = container.clientHeight;
        // Quanto è stato scrollato in verticale
        const scrollTop = container.scrollTop;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            container.removeEventListener("scroll", this.#scrollHandle);

            let scroll = document.getElementById("scroll");
            if(container.parentElement.querySelector("div.header")) {
                let posts = await postHandler(container.parentElement.querySelector("div.header").querySelector("input").value);

                posts.forEach(post => {
                    let post_element = this.#postComponent.getComponentElement();
                    post_element.querySelector("p.username").innerText = post.getAuthorUsername();
                    post_element.querySelector("p.title").innerText = post.getTitle();
                    post_element.querySelector("p.content").innerText = post.getContent();
                    post_element.querySelector("input").value = post.getId();
                    let img = post.getAuthorPropicSrc();
                    if(img !== null) {
                        let propic = post_element.querySelector("div.author-avatar > img");
                        propic.src = img;
                        post_element.querySelector("div.author-avatar > svg").classList.add("hidden");
                        propic.classList.remove("hidden");
                    }
                    scroll.appendChild(post_element);
                });

                if(posts.length != 0) {
                    container.addEventListener("scroll", this.#scrollHandle);
                }
            } else {
                let groups = await groupHandler(document.getElementById("searchbar").querySelector("input").value);

                groups.forEach(group => {
                    let element = this.#groupComponent.getComponentElement();
                    element.querySelector("input[name='id']").value = group.getId();
                    element.querySelector("input[name='description']").value = group.getDescription();
                    scroll.append(element);
                });

                if(groups.length != 0) {
                    container.addEventListener("scroll", this.#scrollHandle);
                }
            }
        }
    }

    async #joinGroupHandler(joinCallback, parent, id, token = null) {
        let error_field = document.getElementById("token_error");
        error_field.classList.add("hidden");
        error_field.innerText = "";

        if(token !== null)  {
            token = token.value;
        }

        let group = await joinCallback(id, token);

        if(group == 401) {
            error_field.innerText = "Invalid token!";
            error_field.classList.remove("hidden");
        } else if(group == 400) {
            error_field.innerText = "Someting whent wrong!";
            error_field.classList.remove("hidden");
        } else {
            let group_card_container = document.getElementById("group_card_container");
            let element = this.#groupCard.getComponentElement();
            element.querySelector("p").innerText = group.getName();
            element.querySelector("input").value = group.getId();
            let img_src = group.getImageSrc();
            if (img_src == null) {
                element.querySelector("img").classList.add("hidden");
            }
            element.querySelector("img").src = group.getImageSrc();
            group_card_container.append(element);

            parent.remove();

            document.getElementById("popup").remove();
        }
    }
}
