const { default: mongoose } = require("mongoose");
const ComplaintModel = require("../schema/complaint.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class ComplaintService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async getUserComplaints(userId, pagination = {}) {

        const paginationErrors =
            this.validateAndSanitizePaginationProps(pagination);
        if (paginationErrors) {
            return paginationErrors;
        }

        const query = {
            raisedBy: new mongoose.Types.ObjectId(userId),
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

module.exports = new ComplaintService(ComplaintModel, 'complaint');
