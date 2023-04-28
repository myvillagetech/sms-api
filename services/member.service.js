const MemberModel = require("../schema/member.schema");
const userModel = require("../schema/user.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class MemberService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async registerMember(data) {
        return this.execute(async () => {
            const user = await userModel.updateOne(
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

            return this.model.create({ userId: user._doc._id, ...data });
        });
    }
}

module.exports = new MemberService(MemberModel, "member");
