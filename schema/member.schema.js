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
        phoneNumber: {
            type: Number,
            required: true,
        },
        alternatePhoneNumber: {
            type: Number,
        },
        properties: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "property",
        }],
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
