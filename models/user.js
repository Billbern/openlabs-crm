const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const userSchema = new Schema({
    _id: {
        type:ObjectIdSchema, 
        default: ObjectId
    },
    username: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    role: { 
        type: ObjectId, 
        ref : 'Roles' 
    },

});

module.exports = mongoose.model('Users', userSchema);