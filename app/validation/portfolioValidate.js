const Joi = require('joi');
function validateAddPortfolio(req) {
    const schema = Joi.object({
        project_category: Joi.required().messages({
            "string.base": `Project Category should be a type of 'text'`,
            "string.empty": `Project Category  cannot be an empty field`,
            "any.required": `Project Category  is a required field`,
        }),
        porject_name: Joi.string().min(3).required().messages({
            "string.base": `Project Name should be a type of 'text'`,
            "string.empty": `Project Name cannot be an empty field`,
            "any.required": `Project Name is a required field`,
        }),
        porject_title: Joi.string().min(3).required().messages({
            "string.base": `Project Title should be a type of 'text'`,
            "string.empty": `Project Title cannot be an empty field`,
            "any.required": `Project Title is a required field`,
        }),
        porject_date: Joi.required().messages({
            "any.required": `date is a required field`,
        }),
        description: Joi.string().min(3).required().messages({
            "string.base": `Project Description should be a type of 'text'`,
            "string.empty": `Project Description cannot be an empty field`,
            "any.required": `Project Description is a required field`,
        }),


    });
    return schema.validate(req);
}
module.exports = {
    validateAddPortfolio
};