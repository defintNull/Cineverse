import { Component } from "./Component";

export class GroupComponent extends Component {
    #card = `<div class="shadow-xl rounded-xl relative h-40 w-full bg-gray-700">
                <p class="text-xl text-gray-900 dark:text-white absolute top-6 left-8"></p>
                <div class="absolute bottom-8 right-20 cursor-pointer flex flex-col items-center justify-center py-2 px-4 rounded-2xl hover:bg-gray-600">
                    <p class="text-xl text-gray-900 dark:text-white">Join</p>
                </div>
                <input hidden type="text" name="id", value="" />
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
