const ComplaintTypeModel = require("../schema/complaintType.schema");
const UserModel = require("../schema/user.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class ComplaintTypeService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    async createComplaintType(data) {
        return this.execute(async () => {

            const user = await UserModel.findOneAndUpdate({
                phoneNumber: data.contactPersonPhone
            }, {
                name: data.contactPersonName,
                phoneNumber: data.contactPersonPhone,

            }, { new : true, upsert: true});

            return await this.model.create({
                name: data.name,
                contactPersons: [user._doc._id]
            })
        })
    }
}

module.exports = new ComplaintTypeService(ComplaintTypeModel, 'complaintType');
