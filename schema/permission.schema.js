const mongoose = require("mongoose");
const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["UI", "API"],
    },
    appId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
        autopopulate: true,
        required: true,
    }
});

PermissionSchema.plugin(require("mongoose-autopopulate"));

const PermissionModel = mongoose.model("Permission", PermissionSchema);

module.exports = PermissionModel;
