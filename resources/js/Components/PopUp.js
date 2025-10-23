import { Component } from "./Component";

export class PopUp extends Component {
    #card = `<div id="popup" class="w-full h-svh z-50 absolute flex flex-col items-center justify-center backdrop-blur-md">
                <div class="flex flex-col w-1/2 py-8 px-16 rounded-xl shadow-lg relative bg-indigo-600 dark:bg-gray-700">
                    <p class="text-2xl dark:text-white text-gray-900 w-full text-center font-semibold"></p>
                    <div class="flex container flex-col w-full grow"></div>
                    <div class="flex flex-col items-center justify-center w-full">
                        <div class="flex flex-row w-1/2 items-center justify-between">
                            <button type="button" class="default-button py-2.5 px-5 cursor-pointer text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Confirm</button>
                            <button type="button" class="delete-button focus:outline-none text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
