import { Component } from "./Component";

export class GroupCard extends Component {
    #card = `<div class="group-card rounded-xl shadow-xl w-full flex flex-row items-center justify-center gap-x-6 pl-6 cursor-pointer bg-slate-50 dark:bg-gray-700 h-20">
                <p class="text-xl grow text-gray-900 dark:text-white line-clamp-2"></p>
                <img class="h-full rounded-r-xl max-w-1/2 w-auto object-cover" src="" alt="" />
                <div class="hidden container">
                    <input hidden type="text" name="id" value="" />
                    <input hidden type="text" name="description" value="" />
                    <input hidden type="text" name="visibility" value="" />
                    <input hidden type="text" name="token" value="" />
                </div>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
