const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const tagSchema = new Schema({
    _id: {
        type:ObjectIdSchema, 
        default: ObjectId
    },
    name: {
        type:String,
        required: true,
    },
    jobs: [{
        type: ObjectId,
        ref: 'Jobs',
    }],
    
});

module.exports = mongoose.model('Tags', tagSchema);