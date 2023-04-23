const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
    {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "complaintType",
        },
        description: {
            type: String,
            required: true,
        },
        raisedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            autopopulate: true,
        },
        images: [{
            type: String,
        }],
        location: {
            latitute: { type: String },
            longitude: { type: String },
        },
        status: {
            type: String,
            required: true,
            enum: ["Created", "Accepted", "Rejected", "Resolved"],
            default: "Created"
        },
    },
    { timestamps: true }
);

ComplaintSchema.plugin(require("mongoose-autopopulate"));

const ComplaintModel = mongoose.model("complaint", ComplaintSchema);
module.exports = ComplaintModel;
