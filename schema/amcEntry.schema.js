const mongoose = require("mongoose");

const AmcEntrySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        periods: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "amcYear",
        }],
        transactionNumber: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["PaymentDone", "Approved", "Rejected"],
        },
        photos: {
            type: [String],
        },

    },
    { timestamps: true }
);

const AmcEntryModel = mongoose.model("amcEntry", AmcEntrySchema);
module.exports = AmcEntryModel;
