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
}

module.exports = new MemberService(MemberModel, "member");
