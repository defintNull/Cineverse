import { Component } from "./Component";

export class GroupComponent extends Component {
    #card = `<div class="shadow-xl rounded-xl relative h-40 w-full bg-gray-700">
                <div class="w-full h-full z-20 absolute">
                    <div class="w-full h-full relative">
                        <div class="flex flex-col items-start w-full py-4 pl-8 bg-gradient-to-t from-transparent to-gray-700 rounded-xl">
                            <p class="text-xl text-gray-900 dark:text-white"></p>
                        </div>
                        <div class="absolute join bottom-8 right-20 cursor-pointer flex flex-col items-center justify-center py-2 px-4 rounded-2xl hover:bg-gray-600">
                            <p class="text-xl text-gray-900 dark:text-white">Join</p>
                        </div>
                    </div>
                </div>
                <input hidden type="text" name="id", value="" />
                <input hidden type="text" name="description" value="" />
                <input hidden type="text" name="visibility" value="" />
                <div class="h-full">
                    <div class="relative h-full">
                        <img class="h-full object-cover rounded-l-xl max-w-2/5" src="" alt="" />
                        <div class="absolute h-full bg-gradient-to-r from-transparent to-gray-700"></div>
                    </div>
                </div>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
