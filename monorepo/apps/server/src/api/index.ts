import { Router, json } from "express";
import cors from "cors";

import webapi from "./webapi";
import booksApi from "./bookapi";
import customerApi from "./customerapi";
import testApi from "./testapi";


const router = Router();
router.use(cors());
router.use(json());
router.use("", testApi);
router.use("/api/contests", webapi);
router.use("/api/books", booksApi);
router.use("/api/customers", customerApi);

export default router;
