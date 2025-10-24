import { Component } from "./Component";

export class CommentForm extends Component {
    #card = `<form id="" method="POST" class="w-2/3 h-full pb-8">
                <div class="relative">
                    <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <textarea id="" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" name=""></textarea>
                    <p class="mt-2 error-field text-sm text-red-600 dark:text-red-500"></p>
                    <button type="submit" class="send flex flex-col items-center justify-center object-cover pr-1 absolute bottom-2 right-4 w-8 h-8 rounded-4xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                        <svg class="h-6 w-8 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <g transform="translate(12 12) rotate(45) scale(0.9 0.9) translate(-12 -12)">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22,2 15,22 11,13 2,9"></polygon>
                            </g>
                        </svg>
                    </button>
                </div>
            </form>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
