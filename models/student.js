const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const studentSchema = new Schema({
    _id: {
        type:ObjectIdSchema, 
        default: ObjectId
    },
    firstName: {
        type:String,
    },
    lastName: {
        type:String,
    },
    middleName: {
        type:String,
    },
    mail:{
        type: String,
    },
    program: {
        type:String,
    },
    resume:{
        type: ObjectId,
        ref: 'Resume',
    },
    user: { 
        type: ObjectId, 
        ref : 'Users' 
    },

});

module.exports = mongoose.model('Student', studentSchema);