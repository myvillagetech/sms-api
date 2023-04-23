const mongoose = require("mongoose");

const UserSignUpOtpSchema = new mongoose.Schema(
    {
        otp: {
            type: Number,
            default: 282812,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { strict: false, timestamps: true }
);

const UserSignUpOtpModel = mongoose.model("userSignUpOtp", UserSignUpOtpSchema);
module.exports = UserSignUpOtpModel;
