import express from "express";
import ViteExpress from "vite-express";
import { initdb } from "./initdb.js";
import api from "./api";

// import testData from "../test-data.json";

const app = express();
initdb();
app.use("", api);

ViteExpress.listen(app, 80, () =>
  console.log("Server is listening on port 80..."),
);