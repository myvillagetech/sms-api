const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        married: {
            type: Boolean,
            required: true,
        },
        spouseOrParentName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },
        status: {
            type: String,
            required: true,
            enum: ["PendingApproval", "Approved", "Rejected"],
        },
        plotNumber: {
            type: String,
            required: true,
        },
        flatNumber: {
            type: String,
            required: true,
        },
        buildingName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        alternatePhoneNumber: {
            type: Number,
        },
        vehicleNumber: {
            type: String,
            required: true,
        },
        location: {
            latitute: { type: String },
            longitude: { type: String },
        },
        memberPhoto: {
            type: String,
        },
        spouseOrParentPhoto: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const MemberModel = mongoose.model("member", MemberSchema);
module.exports = MemberModel;
