const mongoose = require('mongoose');

const catwaysSchema = new mongoose.Schema({
    catwayNumber:{
        type        : Number,
        immutable   : true,
        unique      : true,
        required    : true
    },
    catwayType:{
        type        : String,
        enum        : ["long", "short"],
        immutable   : true,
        unique      : true,
        required    : true
    },
    catwayState:{
        type    : String,
        required: true
    }
});

module.exports = mongoose.model('Catways', catwaysSchema);