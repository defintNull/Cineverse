import { Component } from "./Component";

export class PostComponent extends Component {
    #card = `<div class="flex post flex-col gap-y-4 shadow-xl rounded-xl min-h-60 w-full bg-gray-700 px-4 py-2">
                <div class="flex flex-row items-center justify-between">
                    <p class="text-md group-name text-gray-900 dark:text-white"></p>
                    <p class="text-md username text-gray-900 dark:text-white"></p>
                </div>
                <p class="text-xl title text-gray-900 dark:text-white font-semibold"></p>
                <p class="text-lg content text-gray-900 grow dark:text-white"></p>
                <div class="flex flex-row items-center justify-between border-t-1 border-gray-400 pb-1 pt-2">
                    <div class="rounded-4xl like cursor-pointer p-1.5 hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="like-icon dark:text-white" viewBox="0 0 24 24">
                            <path d="M2 21h4V9H2v12zM22 10.5c0-.83-.67-1.5-1.5-1.5H14l1-4.65.02-.23a1 1 0 0 0-.29-.7L13.17 2 7.59 7.59A1.98 1.98 0 0 0 7 9v10a2 2 0 0 0 2 2h8.5a2.5 2.5 0 0 0 2.45-2l1.07-6a1.5 1.5 0 0 0-.02-.5z"></path>
                        </svg>
                    </div>
                    <div class="rounded-4xl comments cursor-pointer p-1.5 hover:bg-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="comment-icon dark:text-white" viewBox="0 0 24 24">
                            <path d="M20 2H4C2.897 2 2 2.897 2 4v14c0 1.103.897 2 2 2h14l4 4V4c0-1.103-.897-2-2-2zM4 16V4h16v15.172L18.828 16H4z"></path>
                        </svg>
                    </div>
                    <div>
                    </div>
                </div>
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
