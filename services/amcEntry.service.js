const AmcEntryModel = require("../schema/amcEntry.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class AmcEntryService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
}

module.exports = new AmcEntryService(AmcEntryModel, 'amcEntry');
