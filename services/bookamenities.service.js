const BookAmenitiesModel = require("../schema/bookamenities.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class BookAmenitiesService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    getAllBookingsByUserId(userId){
        return this.model.find({
            userId : userId
        }).lean()
    }
}

module.exports = new BookAmenitiesService(BookAmenitiesModel, 'bookamenities');
