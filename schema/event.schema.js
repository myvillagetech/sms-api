const mongoose = require("mongoose");
const UserModel = require("../common/schema/user.schema");

const volunteers = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ["Requested", "Active", "InActive", "Rejected"],
        default : 'Requested'
    },
});

const Guests = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : false
    }
})

const EventSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: false,
        },
        tittle: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            required: true,
        },
        members: {
            type: UserModel,
            required : true
        },
        startDate : {
            type: Date,
            required : true
        },
        endDate : {
            type: Date,
            required : true
        },
        status : {
            type : String,
            required : true,
            enum: ["Requested", "Active", "InActive", "Decline", "Deleted"],
        },
        resonForDecline : {
            type : String,
            required : false,
        },
        photos : {
            type : [String],
            required : false
        },
        interestedMembers : {
            type : [mongoose.Schema.Types.ObjectId],
            required : false
        },
        volunteers : {
            type : volunteers,
            required : false,
        },
        guests : {
            type : Guests,
            required : false
        }
    },
    { timestamps: true }
);

const EventModel = mongoose.model("event", EventSchema);
module.exports = EventModel;
