const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        otp: {
            type: Number,
            default: 282812,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        mpin: {
            type: Number,
        },
    },
    { strict: false, timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
