const mongoose = require("mongoose");

const BookAmenitiesSchema = new mongoose.Schema(
    {
        amenitiyId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        purpose : {
            type : String,
            required : true
        },
        startDate : {
            type : String,
            required : true
        },
        endDate : {
            type : String,
            required : true
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        status : {
            type: String,
            required: true,
            enum: ["Requested", "Confirmed", "Rejected"],
        }

    },
    { timestamps: true }
);

const BookAmenitiesModel = mongoose.model("bookamenities", BookAmenitiesSchema);
module.exports = BookAmenitiesModel;
