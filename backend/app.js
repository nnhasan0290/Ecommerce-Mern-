const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const errMiddleware = require("./middleware/error.js");
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use(errMiddleware);
module.exports = app;
