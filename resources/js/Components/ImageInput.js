import { Component } from "./Component";

export class ImageInput extends Component {
    #input = `<div class="flex flex-col w-full">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" accept=".jpeg, .jpg, image/jpeg"/>
                <p id="file_input_help" class="mt-1 text-sm text-gray-500 dark:text-gray-300">JPG only</p>
                <p class="mt-2 error-field text-sm text-red-600 dark:text-red-500"></p>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#input;
        return temp.firstElementChild;
    }
}



