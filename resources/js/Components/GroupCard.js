import { Component } from "./Component";

export class GroupCard extends Component {
    #card = `<div class="group-card rounded-xl shadow-xl w-full flex flex-col items-center cursor-pointer justify-center bg-indigo-600 dark:bg-gray-700 h-20">
                <p class="text-xl text-gray-900 dark:text-white"></p>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
