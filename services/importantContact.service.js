const ImportantContactModel = require("../schema/importantContact.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class ImportantContactService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
}

module.exports = new ImportantContactService(ImportantContactModel, 'importantContact');
