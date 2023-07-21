const mongoose = require("mongoose");
const UserModel = require("../common/schema/user.schema");

const CommitteeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required:false,
        },
        status: {
            type: String,
            required: true,
            default:'active'
        },
        members: {
            type: [UserModel],
            required : false
        },
        photos : {
            type : [String],
            required : false
        },
        funds : {
            type : Number,
            required : false
        },
    },
    { timestamps: true }
);

const CommitteeModel = mongoose.model("committee", CommitteeSchema);
module.exports = CommitteeModel;
