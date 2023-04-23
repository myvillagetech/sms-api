const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  name: {
        type: String,
        required: true,
    }
});

const AuthModel = mongoose.model("auth", AuthSchema);
module.exports = AuthModel;
