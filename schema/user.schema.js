const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
            default: 123456,
        },
        otp: {
            type: Number,
            default: 282812,
        },
        email: {
            type: String,
            // required: true,
            // unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        mpin: {
            type: Number,
        },

        memberId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'member'
        }
    },
    { strict: false, timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
