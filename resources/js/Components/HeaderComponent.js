import { Component } from "./Component";

export class HeaderComponent extends Component {
    #header = `<div class="w-full header sticky top-0 dark:bg-gray-800 bg-indigo-600 flex flex-row items-center justify-between border-b-1 border-gray-400 py-4">
                    <button type="button" class="red-button focus:outline-none text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"></button>
                    <p class="text-2xl text-gray-900 dark:text-white font-semibold"></p>
                    <button type="button" class="normal-button py-2.5 px-5 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"></button>
                </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#header;
        return temp.firstElementChild;
    }
}
