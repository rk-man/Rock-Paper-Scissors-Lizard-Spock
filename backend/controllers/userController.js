const User = require("../models/userModel");
const catchAsync = require("express-async-handler");
const appError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

const createAndSendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        user,
        token,
    });
};

exports.createNewUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);

    if (!user) {
        return next(new appError(400, "User can't be created"));
    }

    createAndSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
        return next(new appError(400, "User Can't log in...."));
    }

    createAndSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new appError(400, "User hasn't logged in yet"));
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ _id: decoded.id });

    console.log(user);

    if (!user) {
        return next(
            new appError(
                400,
                "User associated with that token has been expired"
            )
        );
    }

    req.user = user;

    return next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        user: updatedUser,
    });
});
