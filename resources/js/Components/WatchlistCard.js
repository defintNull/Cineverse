import { Component } from "./Component";

export class WatchlistCard extends Component {
    #card = `<div class="flex watchlist-card flex-row w-full items-center min-h-16 h-16 px-2 rounded-xl shadow-xl bg-gray-600">
                <p class="text-xl name font-semibold text-white grow"></p>
                <div class="flex check flex-row items-center justify-center w-8 h-8">
                    <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <input hidden type="text" name="watchlist_id" value="" />
            </div>`;

    getComponentElement() {
        let temp = document.createElement("div");
        temp.innerHTML = this.#card;
        return temp.firstElementChild;
    }
}
