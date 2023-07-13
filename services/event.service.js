const EventModel = require("../schema/event.schema");
const BaseService = require("@baapcompany/core-api/services/base.service");

class EventService extends BaseService {
    constructor(dbModel, entityName) {
        super(dbModel, entityName);
    }

    deleteEvent(eventId){
        try{
            if(!eventId){
                throw new Error("EventId required");
            }
            return this.model.findOneAndUpdate(eventId,{
                status : 'Deleted'
            },{new : true}).lean();
        }catch (error) {
            return new ServiceResponse({
                isError: true,
                message: error.message,
            });
        }
    }
}

module.exports = new EventService(EventModel, 'event');
