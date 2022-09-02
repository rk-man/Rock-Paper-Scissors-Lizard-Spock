const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });
const path = require("path");
const PORT = process.env.PORT || 5000;

const DB_CON_STRING = process.env.DB_CON_STRING.replace(
    "<password>",
    process.env.DB_PASSWORD
);

mongoose
    .connect(DB_CON_STRING)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

const app = require("./app");

if (process.env.NODE_ENV === "production") {
    //set static files folder
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    //display the static file
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        );
    });
}

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
