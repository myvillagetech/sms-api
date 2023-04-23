const UserRoleMappingModel = require("../schema/userRoleMapping.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");
const mongoose = require("mongoose");

class UserRoleMappingService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async getAllUserRolesByGroup(userDetails) {
        return this.execute(() => {
            return this.model.aggregate([
                {
                    $match: {
                        groupId: new mongoose.Types.ObjectId(
                            userDetails.groupId
                        ),
                        userId: new mongoose.Types.ObjectId(
                            userDetails.userId
                        ),
                    },
                },
                {
                    $lookup: {
                        from: "roles",
                        localField: "roleId",
                        foreignField: "_id",
                        as: "role",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "permissions",
                                    localField: "permissions",
                                    foreignField: "_id",
                                    as: "permissions",
                                },
                            },
                        ],
                    },
                },
                { $unwind: "$role" },
                {
                    $match: {
                        "role.appId": new mongoose.Types.ObjectId(
                            userDetails.appId
                        ),
                    },
                },
                {
                    $project: {
                        "role.name": 1,
                        "_id":0,
                        "role.permissions": {
                            $reduce: {
                                input: "$role.permissions",
                                initialValue: [],
                                in: {
                                    $concatArrays: ["$$value", ["$$this.name"]],
                                },
                            },
                        },
                    },
                },
            ]);
        });
    }
}

module.exports = new UserRoleMappingService(
    UserRoleMappingModel,
    "userRoleMapping"
);
