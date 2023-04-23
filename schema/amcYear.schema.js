const mongoose = require("mongoose");

const AmcYearSchema = new mongoose.Schema(
    {
        from: {
            type: Date,
            required: true,
        },
        to: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
        }
    },
    { timestamps: true }
);

const AmcYearModel = mongoose.model("amcYear", AmcYearSchema);
module.exports = AmcYearModel;
