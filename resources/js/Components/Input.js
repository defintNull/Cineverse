import { Component } from "./Component";

export class Input extends Component {
    #input = '<div><label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label><input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required /></div>';

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#input;
        return temp.firstElementChild;
    }
}
