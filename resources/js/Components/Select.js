import { Component } from "./Component";

export class Select extends Component {
    #select = `<div class="">
                    <label for="select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <select id="select" class="bg-gray-50 cursor-pointer border border-gray-300 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </select>
                    <p class="mt-2 error-field text-sm text-red-600 dark:text-red-500"></p>
                </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#select;
        return temp.firstElementChild;
    }
}
