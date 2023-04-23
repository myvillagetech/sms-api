const { default: mongoose } = require("mongoose");
const PermissionModel = require("../schema/permission.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class PermissionService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async getAllPermissionsByApp(appId, searchTerm, pagination = {}) {
        const paginationErrors =
            this.validateAndSanitizePaginationProps(pagination);
        if (paginationErrors) {
            return paginationErrors;
        }

        const query = {
            appId: new mongoose.Types.ObjectId(appId),
        };

        if (searchTerm) {
            query["$or"] = [{ name: new RegExp(searchTerm, "i")}, { code: new RegExp(searchTerm, "i") }];
        }

        return this.execute(async () => {
            return {
                items: await this.model.find(
                    query,
                    {},
                    {
                        skip: pagination.pageSize * (pagination.pageNumber - 1),
                        limit: pagination.pageSize,
                    }
                ),
                totalItemsCount: await this.model.countDocuments(query),
            };
        });
    }

    async bulkadd(permissions, appId) {
        return this.execute(() => {
            const queries = permissions.map((permission) => {
                return {
                    updateOne: {
                        filter: {
                            name: permission.name,
                            appId: appId,
                        },
                        update: {
                            $set: { ...permission, appId: appId },
                        },
                        upsert: true,
                    },
                };
            });
            return this.model.bulkWrite(queries);
        });
    }
}

module.exports = new PermissionService(PermissionModel, "permission");
