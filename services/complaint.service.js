const { default: mongoose } = require("mongoose");
const ComplaintModel = require("../schema/complaint.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class ComplaintService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async getUserComplaints(userId, pagination = {}) {

        return this.preparePaginationAndReturnData(query, criteria);
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
