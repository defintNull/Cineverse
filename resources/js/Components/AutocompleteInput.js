import { Component } from "./Component";

export class AutocompleteInput extends Component {
    #input = `<div class="w-full relative">
                    <label for="input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input..." required />
                    <input hidden type="text" value="" />
                    <div id="autocomplete-list" class="absolute hidden z-10 w-full p-2 flex flex-col gap-y-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                    </div>
                    <p class="mt-2 error-field text-sm text-red-600 dark:text-red-500"></p>
                </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#input;
        return temp.firstElementChild;
    }
}
