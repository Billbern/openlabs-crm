const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const companySchema = new Schema({
    _id: {
        type:ObjectIdSchema, 
        default: ObjectId
    },
    companyName: {
        type:String,
    },
    address: {
        type:String,
    },
    description: {
        type:String,
    },
    mail:{
        type: String,
    },
    category: {
        type:String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    jobs:[{
        type: ObjectId,
        ref: 'Jobs',
    }],
    user: { 
        type: ObjectId, 
        ref : 'Users' 
    },

});

module.exports = mongoose.model('Company', companySchema);