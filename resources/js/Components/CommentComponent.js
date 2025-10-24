import { Component } from "./Component";

export class CommentComponent extends Component {
    #card = `<div class="flex comment flex-col w-full gap-y-2">
                <div class="flex flex-row items-center gap-x-2">
                    <div class="author-avatar relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                        <img type="button" class="hidden w-8 h-8 rounded-full" src="" alt="">
                        <svg class="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    <p class="text-lg username text-gray-900 dark:text-white"></p>
                </div>
                <p class="text-lg content pl-2 ml-4 text-gray-900 dark:text-white border-l-2 border-gray-300 dark:border-gray-500"></p>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
