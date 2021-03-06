const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const feedbackSchema = new Schema({
    _id: {
        type:ObjectIdSchema, 
        default: ObjectId
    },
    details: {
        type:String,
    },
    user: { 
        type: ObjectId, 
        ref : 'Users' 
    },

});

module.exports = mongoose.model('Feedback', feedbackSchema);