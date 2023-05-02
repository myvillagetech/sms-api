const AmcEntryModel = require("../schema/amcEntry.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class AmcEntryService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async getUserAMCs(userId, criteria) {

        const pagination = {
            pageNumber : criteria.pageNumber,
            pageSize : criteria.pageSize
        }

        const paginationErrors =
            this.validateAndSanitizePaginationProps(pagination);
        if (paginationErrors) {
            return paginationErrors;
        }

        const query = {
            userId: new mongoose.Types.ObjectId(userId),
        }
        return this.execute(async () => {
            return {
                items: await this.model.find(
                    query,
                    {},
                    {
                        skip: pagination.pageSize * (pagination.pageNumber - 1),
                        limit: pagination.pageSize,
                    }
                ),
                totalItemsCount: await this.model.countDocuments(query),
            };
        });
    }

    
}

module.exports = new AmcEntryService(AmcEntryModel, 'amcEntry');
