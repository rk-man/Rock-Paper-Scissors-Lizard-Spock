const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use("/api/v1/users", userRouter);

app.use(errorHandler);

module.exports = app;
