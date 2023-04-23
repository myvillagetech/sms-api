const AmcYearModel = require("../schema/amcYear.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class AmcYearService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
}

module.exports = new AmcYearService(AmcYearModel, 'amcYear');
