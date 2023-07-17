const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
    {
        plotNumber: {
            type: String,
            required: true,
        },
        flatNumber: {
            type: String,
            required: false,
        },
        buildingName: {
            type: String,
            required: true,
        },
        vehicleNumber: {
            type: String,
            required: false,
        },
        location : {
            type : String,
            required : false
        }
    },
    { timestamps: true }
);

const PropertyModel = mongoose.model("property", PropertySchema);
module.exports = PropertyModel;
