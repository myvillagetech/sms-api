const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        shortName: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

const GroupModel = mongoose.model("group", GroupSchema);
module.exports = GroupModel;
