import { Router } from "express";
import * as AuthorController from "./../../controllers/author.controller.js";
import * as BookBaseController from "./../../controllers/book-base.controller.js";
import * as CollectionController from "./../../controllers/collection.controller.js";
import * as SeriesController from "./../../controllers/series.controller.js";
import * as FullBookController from "./../../controllers/full-book.controller.js";

const router = Router();

//BOOKBASE
router.get("/bookBase", BookBaseController.list);
router.post("/bookBase", BookBaseController.create);
router.get("/bookBase/:id", BookBaseController.detail);
router.patch("/bookBase/:id", BookBaseController.update);
router.delete("/bookBase/:id", BookBaseController.destroy);

//AUTHOR
router.get("/author", AuthorController.list);
router.post("/author", AuthorController.create);
router.get("/author/:id", AuthorController.detail);
router.patch("/author/:id", AuthorController.update);
router.delete("/author/:id", AuthorController.destroy);

//SERIES
router.get("/series", SeriesController.list);
router.post("/series", SeriesController.create);
router.get("/series/:id", SeriesController.detail);
router.patch("/series/:id", SeriesController.update);
router.delete("/series/:id", SeriesController.destroy);

//COLLECTION
router.get("/collection", CollectionController.list);
router.post("/collection", CollectionController.create);
router.get("/collection/:id", CollectionController.detail);
router.patch("/collection/:id", CollectionController.update);
router.delete("/collection/:id", CollectionController.destroy);

//FULL-BOOK
router.get("/fullBook", FullBookController.list);
router.post("/fullBook", FullBookController.create);
router.get("/fullBook/:id", FullBookController.detail);
// router.patch("/fullBook/:id", FullBookController.update);
// router.delete("/fullBook/:id", FullBookController.destroy);

export default router;