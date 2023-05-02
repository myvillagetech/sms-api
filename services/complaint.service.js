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
        };
        return this.paginationResults(query, pagination);
    }

    getStatusCounts(criteria) {
        return this.execute(() => {
            return this.model.aggregate([
                {
                    $group: {
                        _id: { status: "$status" },
                        count: { $sum: 1 },
                    },
                },
            ]);
        });
    }
}

module.exports = new ComplaintService(ComplaintModel, "complaint");
