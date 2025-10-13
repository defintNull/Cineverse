export class Button {
    #element
    constructor(){
        this.#element = document.createElement("div");
        this.#element.appendChild(document.createElement('div'));
        this.#element.querySelector("div").outerHTML = '<button type="submit" id="search-btn" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">Cerca</button>';
        this.#element = this.#element.querySelector("button");
    }

    getButtonElement(){
        return this.#element;
    }
}
