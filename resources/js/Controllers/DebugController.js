import { SPAFetchService } from "../Services/SPAFetchService";
import { Controller } from "./Controller";

export class DebugController extends Controller {
    async start() {
        let fe = await SPAFetchService.getInstance();
        let response = await fe.GETFetch("/spa/watchlist/index", null);
        console.log(await response.json());
    }
}
