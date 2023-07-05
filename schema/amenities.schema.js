const mongoose = require("mongoose");

const AmenitiesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description : {
            type : String,
            required : true
        },
        photos : {
            type : [String],
            required : false
        },
        capacity : {
            type : Number,
            required : false
        },
        basePrice : {
            type : Number,
            required : false
        },
        status : {
            type : String,
            default : 'ACTIVE'
        }
    },
    { timestamps: true }
);

const AmenitiesModel = mongoose.model("amenities", AmenitiesSchema);
module.exports = AmenitiesModel;
