const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    appId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
        autopopulate: true,
        required: true,
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        autopopulate: true,
    }]
});

RoleSchema.plugin(require("mongoose-autopopulate"));

const RoleModel = mongoose.model("Role", RoleSchema);

module.exports = RoleModel;
