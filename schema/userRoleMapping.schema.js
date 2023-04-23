const mongoose = require("mongoose");

const UserRoleMappingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            // autopopulate: true,
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            autopopulate: true,
        },
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "group",
            autopopulate: true,
        }
    },
    { timestamps: true }
);

UserRoleMappingSchema.plugin(require("mongoose-autopopulate"));

const UserRoleMappingModel = mongoose.model(
    "userRoleMapping",
    UserRoleMappingSchema
);
module.exports = UserRoleMappingModel;
