const mongoose = require('mongoose');

/**
* UserShema is used to create User's Schema with the possible fields used inside the system.
*/
const PhotoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, trim: true, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    name: {type: String, trim: true, required: true, unique: true },
    password: {type: String, trim: true, required: true },
    devices: [{_id: false, id: {type: String, trim: true, required: true },name: {type: String, trim: true, required: true }, registerDate: {type: Date, default: new Date()}}]
},
    {
        versionKey: false,
        timestamps: true
    });

/**
* @typedef Photo
*/
module.exports = mongoose.model('photo', PhotoSchema);