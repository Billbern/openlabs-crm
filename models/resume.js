const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const resumeSchema = new Schema({
    _id: {
        type:ObjectIdSchema, 
        default: ObjectId
    },
    background: {
        type:String,
    },
    biodata:{
        type:String,
    },
    lastName: {
        type:String,
    },
    student: { 
        type: ObjectId, 
        ref : 'Student' 
    },

});

module.exports = mongoose.model('Resume', resumeSchema);