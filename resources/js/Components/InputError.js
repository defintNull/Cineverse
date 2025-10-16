import { Component } from "./Component";

export class InputError extends Component {
    #input_error = `<p class="mt-2 error-field text-sm text-red-600 dark:text-red-500"></p>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#input_error;
        return temp.firstElementChild;
    }
}
