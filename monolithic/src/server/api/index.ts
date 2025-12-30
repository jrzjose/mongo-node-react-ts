import { Router, json } from "express";
import cors from "cors";

import webapi from "./webapi";
import booksApi from "./bookapi";
import testApi from "./testapi";

const router = Router();
router.use(cors());
router.use(json());
router.use("", testApi);
router.use("/api/contests", webapi);
router.use("/api/books", booksApi);

export default router;
