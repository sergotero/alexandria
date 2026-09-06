import { Router } from "express";
import uploader from "../../middlewares/multer.middleware.js";
import * as AuthorController from "./../../controllers/author.controller.js";
import * as BookBaseController from "./../../controllers/book-base.controller.js";
import * as CollectionController from "./../../controllers/collection.controller.js";
import * as SeriesController from "./../../controllers/series.controller.js";
import * as FullBookController from "./../../controllers/full-book.controller.js";
import * as ReadBookController from "./../../controllers/read-book.controller.js";
import * as UserController from "./../../controllers/user.controller.js";
import * as BooksAuthorsController from "./../../controllers/booksauthors.controller.js";
import * as BooksSeriesController from "./../../controllers/booksseries.controller.js";
import * as BooksCollectionsController from "./../../controllers/bookscollections.controller.js";

const router = Router();

//BOOKBASE
router.get("/bookbase", BookBaseController.list);
router.post("/bookbase", BookBaseController.create);
router.get("/bookbase/:id", BookBaseController.detail);
router.patch("/bookbase/:id", uploader.single("cover"), BookBaseController.update);
router.delete("/bookbase/:id", BookBaseController.destroy);

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

//BOOKSAUTHORS
router.post("/booksauthors", BooksAuthorsController.create);
router.patch("/booksauthors", BooksAuthorsController.update);
router.delete("/booksauthors", BooksAuthorsController.destroy);

//BOOKSSERIES
router.post("/booksseries", BooksSeriesController.create);
router.patch("/booksseries", BooksSeriesController.update);
router.delete("/booksseries", BooksSeriesController.destroy);

//BOOKSCOLECTIONS
router.post("/bookscollections", BooksCollectionsController.create);
router.patch("/bookscollections", BooksCollectionsController.update);
router.delete("/bookscollections", BooksCollectionsController.destroy);

//FULL-BOOK
router.get("/fullbook", FullBookController.list);
router.post("/fullbook", FullBookController.create);
router.get("/fullbook/:id", FullBookController.detail);
router.patch("/fullbook/:id", FullBookController.update);

//READ-BOOK
router.get("/readook", ReadBookController.list);
router.post("/readbook", ReadBookController.create);
router.get("/readbook/:id", ReadBookController.detail);
router.patch("/readbook/:id", ReadBookController.update);
router.delete("/readbook/:id", ReadBookController.destroy);

//USER
router.get("/user", UserController.list);
router.post("/user", UserController.create);
router.get("/user/:id", UserController.detail);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.destroy);

//ACCESS
router.post("/access/login", UserController.login);
router.delete("/access/logout", UserController.logout);

export default router;