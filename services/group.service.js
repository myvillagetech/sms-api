const GroupModel = require("../schema/group.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class GroupService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async getByShortName(shortName) {
        return this.execute(() => {
            return this.model.findOne({shortName: shortName});
        });
    }
}

module.exports = new GroupService(GroupModel, 'group');
