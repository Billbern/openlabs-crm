const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const DateObj = mongoose.Schema.Types.Date;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const jobSchema = new Schema({
    _id: {
        type:ObjectIdSchema, 
        default: ObjectId
    },
    title: {
        type:String,
        required: true,
    },
    department: {
        type:String,
        required: true,
    },
    region: {
        type:String,
        required: true,
    },
    city: {
        type:String,
        required: true,
    },
    content: {
        type: String,
    },
    user: { 
        type: ObjectId, 
        ref : 'Users' 
    },
    applicants: [{
        type: ObjectId,
        ref: 'Students'
    }],
    tags: [{
        type: ObjectId,
        ref: 'Tags',
    }],
    createdAt: {
        type: DateObj,
        default: Date,

    }
    
});

module.exports = mongoose.model('Jobs', jobSchema);