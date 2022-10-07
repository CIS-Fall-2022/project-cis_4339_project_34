const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
let organizationDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationName: {
        type: String,
        require: true
    },
}, {
    collection: 'organizations',
});

module.exports = mongoose.model('organizationModel', organizationDataSchema)