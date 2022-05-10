const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;

const roleSchema = new Schema({
    _id: {
        type: ObjectIdSchema, 
        default: ObjectId
    },
    name: {
        type:String,
        required: true,
        unique: true
    }

});

module.exports = mongoose.model('Roles', roleSchema);