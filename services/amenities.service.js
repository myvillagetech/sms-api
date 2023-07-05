const AmenitiesModel = require("../schema/amenities.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class AmenitiesService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }
}

module.exports = new AmenitiesService(AmenitiesModel, 'amenities');
