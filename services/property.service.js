const PropertyModel = require("../schema/property.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class PropertyService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async bulkAdd(properties){
        const data = await this.model.insertMany(properties);
        const ids = data.map(item => item._id);
        return ids;
    }
}

module.exports = new PropertyService(PropertyModel, 'property');
