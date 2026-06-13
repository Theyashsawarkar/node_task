require("dotenv").config();
require("./config/connection");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");
const indexRouter = require("./src/routes/index");
const { globalErrorHandler } = require("../utils/globalErrorHandler");
const { handleNotFoundRoute } = require("../utils/nonFoundRoutesHandler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", indexRouter);

app.use(handleNotFoundRoute());
app.use(globalErrorHandler);

module.exports = app;
