const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
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

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
