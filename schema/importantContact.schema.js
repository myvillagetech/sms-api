const mongoose = require("mongoose");

const ImportantContactSchema = new mongoose.Schema(
    {
        contactName: {
            type: String,
            required: true,
        },
        contactType: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const ImportantContactModel = mongoose.model("importantContact", ImportantContactSchema);
module.exports = ImportantContactModel;
