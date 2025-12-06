const Joi = require("joi");

exports.createCatwaySchema = Joi.object({
    catwayNumber: Joi.number().required(),
    catwayType: Joi.string().valid("long", "short").required(),
    catwayState: Joi.string().required()
});

exports.updateCatwaySchema = Joi.object({
    catwayState: Joi.string().required()
});
