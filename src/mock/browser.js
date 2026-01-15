import { setupWorker } from "msw/browser";
import { handleBooks } from "./books-handler.js";

const worker = setupWorker(...Object.values(handleBooks));

export default worker;