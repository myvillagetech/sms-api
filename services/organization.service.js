const OrganizationModel = require("../schema/organization.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class OrganizationService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
}

module.exports = new OrganizationService(OrganizationModel, 'organization');
