const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    role: {
        type: [String],
        required: false,
        default : 'Member'
    },
},{timestamps : true, _id : false});

module.exports = UserModel