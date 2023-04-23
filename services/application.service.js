const ApplicationModel = require("../schema/application.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class ApplicationService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async bulkadd(apps) {
        return this.execute(() => {
            const queries = apps.map((app) => {
                return {
                    updateOne: {
                        filter: {
                            shortName: app.shortName,
                        },
                        update: {
                            $set: app,
                        },
                        upsert: true,
                    },
                };
            });
            return this.model.bulkWrite(queries);
        });
    }

    async getByShortName(shortName) {
        return this.execute(() => {
            return this.model.findOne({shortName: shortName});
        });
    }
}

module.exports = new ApplicationService(ApplicationModel, 'application');
