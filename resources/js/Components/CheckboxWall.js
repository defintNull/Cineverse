import { Component } from "./Component";

export class CheckboxWall extends Component {
    #checkbox_wall = `<div class="relative">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                        <select type="text" class="bg-gray-50 cursor-pointer border border-gray-300 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                            <option selected>Select...</option>
                        </select>
                        <div id="checkbox_wall" class="absolute hidden z-10 mt-2">
                            <div class="flex items-center mb-4">
                                <input type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                            </div>
                        </div>
                    </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#checkbox_wall;
        return temp.firstElementChild;
    }
}
