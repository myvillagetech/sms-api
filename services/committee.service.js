const CommitteeModel = require("../schema/committee.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class CommitteeService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
}

module.exports = new CommitteeService(CommitteeModel, 'committee');
