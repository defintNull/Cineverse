import { Component } from "./Component";

export class ArrowRight extends Component {
    #arrow = `<svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="32"
                height="32">
                <polyline points="9 18 15 12 9 6" />
            </svg>`;

    getComponentElement(){
        let temp = document.createElement("div");
        temp.innerHTML = this.#arrow;
        return temp.firstElementChild;
    }
}
