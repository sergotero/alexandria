import { Router } from "express";
import * as AuthorController from "../../controllers/author.controller.js";

const router = Router();

//BOOKBASE
// router.get("/bookBase", bookBaseController);
// router.post("/bookBase", bookBaseController);
// router.get("/bookBase/:id", bookBaseController);
// router.patch("/bookBase", bookBaseController);
// router.delete("/bookBase", bookBaseController);

//AUTHOR
router.get("/author", AuthorController.list);
router.post("/author", AuthorController.create);
router.get("/author/:id", AuthorController.detail);
router.patch("/author/:id", AuthorController.update);
router.delete("/author/:id", AuthorController.destroy);

//SERIES
// router.get("/series", seriesController);
// router.post("/series", seriesController);
// router.get("/series/:id", seriesController);
// router.patch("/series", seriesController);
// router.delete("/series", seriesController);

//COLLECTION
// router.get("/collection", collectionController);
// router.post("/collection", collectionController);
// router.get("/collection/:id", collectionController);
// router.patch("/collection", collectionController);
// router.delete("/collection", collectionController);

export default router;