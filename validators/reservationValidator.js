const Joi = require("joi");

exports.createReservationSchema = Joi.object({
    clientName: Joi.string().required(),
    boatName: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
});

exports.updateReservationSchema = Joi.object({
    clientName: Joi.string(),
    boatName: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date()
});