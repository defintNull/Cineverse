import { Controller } from "./Controller";

export class DebugController extends Controller {
    start() {
        let prova = document.createElement("h1");
        prova.innerHTML = "PROVA";
        document.body.appendChild(prova);
    }
}
