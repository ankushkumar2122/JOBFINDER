const Joi = require("joi");
module.exports.jobSchema = Joi.object({
    job: Joi.object({
        companyName: Joi.string().required(),
        postby: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});