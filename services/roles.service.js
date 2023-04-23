const RoleModel = require("../schema/role.schema");
const PermissionModel = require("../schema/permission.schema");
const UserRoleMappingModel = require("../schema/userRoleMapping.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");
const { default: mongoose } = require("mongoose");

class RolesService extends BaseService{
    async save(roleObject) {
        return this.create(roleObject)
    }

    async update(roleObject,id) {
        return this.updateById(id, roleObject)
    }

    async getAllRoles() {
        return this.getAllByCriteria({});
    }

    async addPermision(permissionId, roleId) {
        return this.execute(() => {
            return this.model.findByIdAndUpdate(roleId, {
                $addToSet : {
                    permissions: permissionId
                }
            }, {
                new: true
            })
        })
    }

    // async getAllRolesByApp(appId) {
    //     return this.execute(() => {
    //         return this.model.find({
    //             appId : new mongoose.Types.ObjectId(appId)
    //         })
    //     })
    // } 

    async getAllRolesByApp(appId, searchTerm, pagination = {}) {
        const paginationErrors =
            this.validateAndSanitizePaginationProps(pagination);
        if (paginationErrors) {
            return paginationErrors;
        }

        const query = {
            appId: new mongoose.Types.ObjectId(appId),
        };

        if (searchTerm) {
            query["name"] = new RegExp(searchTerm, "i");
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

    async cleanupRolesData() {
        await this.execute(() => {
            return this.model.deleteMany({})
        });

        await this.execute(() => {
            return PermissionModel.deleteMany({})
        });

        return await this.execute(() => {
            return UserRoleMappingModel.deleteMany({})
        });
    }
}

module.exports = new RolesService(RoleModel, 'role');
