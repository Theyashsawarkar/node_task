import { fileURLToPath } from "url";
import path, { dirname } from "path";

import express from "express";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index.js";
import { globalErrorHandler } from "../utils/globalErrorHandler.js";
import { handleNotFoundRoute } from "../utils/nonFoundRoutesHandler.js";

// Reconstruct __dirname for ESM
const fileName = fileURLToPath(import.meta.url);
const directoryName = dirname(fileName);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(directoryName, "public")));
app.use(cors());

app.use("/api", indexRouter);

app.use(handleNotFoundRoute);
app.use(globalErrorHandler);

export default app;
