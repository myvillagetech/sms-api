const MemberModel = require("../schema/member.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class MemberService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
}

module.exports = new MemberService(MemberModel, 'member');
