const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    catwayNumber:{
        type        : Number,
        immutable   : true,
        unique      : true,
        required    : true
    },
    clientName:{
        type        : String,
        trim        : true,
        required    : [true, 'Le nom est requis'],
    },
    boatName:{
        type        : String,
        trim        : true,
        required    : true
    },
    startDate: {
        type        : Date,
        required    : true
    },
    endDate: {
        type        : Date,
        required    : true
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);