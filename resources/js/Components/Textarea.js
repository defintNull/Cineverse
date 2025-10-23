import { Component } from "./Component";

export class Textarea extends Component {
    #textarea = `<div class="">
                    <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <textarea id="" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                    <p class="mt-2 error-field text-sm text-red-600 dark:text-red-500"></p>
                </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#textarea;
        return temp.firstElementChild;
    }
}
