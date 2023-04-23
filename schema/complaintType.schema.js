const mongoose = require("mongoose");

const ComplaintTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contactPersons: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }],
    },
    { timestamps: true }
);

const ComplaintTypeModel = mongoose.model("complaintType", ComplaintTypeSchema);
module.exports = ComplaintTypeModel;
