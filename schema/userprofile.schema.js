const mongoose = require("mongoose");

const UserprofileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    { strict: false, timestamps: true }
);

const UserprofileModel = mongoose.model("userprofile", UserprofileSchema);
module.exports = UserprofileModel;
