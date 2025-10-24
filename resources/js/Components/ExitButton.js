import { Component } from "./Component";

export class ExitButton extends Component {
    #card = `<div id="" class="flex flex-col absolute rounded-4xl cursor-pointer top-8 left-8 items-center justify-center w-10 h-10 hover:bg-gray-200 dark:hover:bg-gray-700">
                <svg class="text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
