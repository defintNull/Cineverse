import { Controller } from "./Controller";

export class DebugController extends Controller {
    start() {
        let prova = document.createElement("h1");
        prova.classList.add("text-white"), "dark:text-gray-900";
        prova.innerHTML = "PROVA";
        document.body.querySelector("main").appendChild(prova);
    }
}
