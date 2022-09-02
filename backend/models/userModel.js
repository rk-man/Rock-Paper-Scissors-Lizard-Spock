const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true],
        default: `xstarx-${Math.random * 50 + Math.random * 50}`,
        unique: [true],
    },

    score: {
        type: Number,
        default: 0,
    },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
