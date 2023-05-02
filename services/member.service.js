const MemberModel = require("../schema/member.schema");
const userModel = require("../schema/user.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class MemberService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async adminRegisterMember(data) {
        return this.registerMember(data, "Approved");
    }

    async registerMember(data, status = "PendingApproval") {
        return this.execute(async () => {
            const user = await userModel.findOneAndUpdate(
                {
                    phoneNumber: data.phoneNumber,
                },
                {
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                },
                {
                    upsert: true,
                    new: true,
                }
            );

            return this.model.create({
                userId: user._doc._id,
                ...data,
                status: status,
            });
        });
    }

    async updateMemberStatus(memberId, status) {
        return this.execute(() => {
            return this.model.findOneandUpdateById(
                memberId,
                { status: status },
                { new: true }
            );
        });
    }

    async searchByCriteria(criteria) {
        const pagination = {
            pageNumber: criteria.pageNumber,
            pageSize: criteria.pageSize,
        };
        const paginationErrors =
            this.validateAndSanitizePaginationProps(pagination);
        if (paginationErrors) {
            return paginationErrors;
        }

        const query = {
            status: { $ne: "PendingApproval" },
        };

        if (criteria.name) {
            query["name"] = new RegExp(criteria.name, "i");
        }

        if (criteria.plotNumber) {
            query["plotNumber"] = new RegExp(criteria.plotNumber, "i");
        }

        if (criteria.flatNumber) {
            query["flatNumber"] = new RegExp(criteria.flatNumber, "i");
        }

        if (criteria.buildingName) {
            query["buildingName"] = new RegExp(criteria.buildingName, "i");
        }

        if (criteria.vehicleNumber) {
            query["vehicleNumber"] = new RegExp(criteria.vehicleNumber, "i");
        }

        if (criteria.phoneNumber) {
            query["phoneNumber"] = phoneNumber;
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
}

module.exports = new MemberService(MemberModel, "member");
