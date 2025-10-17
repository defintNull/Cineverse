import { Component } from "./Component"

export class NavigatorElement extends Component {
    #navigator = `<div class="w-full absolute z-10 bottom-0 flex flex-col pt-6 items-center justify-bottom bg-gradient-to-b from-transparent to-gray-800">
                        <div class="flex flex-row gap-x-20">
                            <p class="text-xl text-white font-semibold pb-4"></p>
                        </div>
                    </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#navigator;
        return temp.firstElementChild;
    }
}
