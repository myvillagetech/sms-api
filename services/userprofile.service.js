const UserprofileModel = require("../schema/userprofile.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class UserprofileService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
    getAllRequestsByCriteria(criteria) {
        const query = {};

        if (criteria.displayName) {
            query.displayName = criteria.displayName;
        }

        if (criteria.phoneNo) {
            query.phoneNo = criteria.phoneNo;
        }

        return this.getAllByCriteria(query);
    }
}

module.exports = new UserprofileService(UserprofileModel, "userprofile");
