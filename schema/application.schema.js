const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        shortName: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
        }
    },
    { timestamps: true }
);

const ApplicationModel = mongoose.model("application", ApplicationSchema);
module.exports = ApplicationModel;
