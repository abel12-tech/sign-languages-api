const express = require("express");
const app = express();
const morgan = require("morgan");

const signRouter = require("./routes/signRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");


app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1/signs", signRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
