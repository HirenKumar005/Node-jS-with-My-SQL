const Joi = require('joi');

function validateUser(req) {
    const schema = Joi.object({

        first_name: Joi.string().min(3).required().empty().messages({
            "string.base": `First Name should be a type of 'text'`,
            "string.empty": `First Name cannot be an empty field`,
            "any.required": `First Name is a required field`,
        }),
        last_name: Joi.string().min(3).required().empty().messages({
            "string.base": `Last Name should be a type of 'text'`,
            "string.empty": `Last Name cannot be an empty field`,
            "any.required": `Last Name is a required field`,
        }),
        email: Joi.string().min(3).required().email().messages({
            "string.base": `email should be a type of 'text'`,
            "string.empty": `email cannot be an empty field`,
            "string.email": `email format not valid`,
            "any.required": `email is a required field`,
        }),
        phone: Joi.number().min(10).required().messages({
            "number.base": `Phone number should be number`,
            "number.empty": `Phone number cannot be an empty field`,
            "number.min": "Phone number must be 10 digit",
            "number.max": "Phone number can't be greater than 10 digit",
            "any.required": `Phone number is a required field`,
        }),
        password: Joi.string().required().empty().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        repassword: Joi.string().required().empty().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        }),
        gender: Joi.required().messages({
            "string.empty": `gender cannot be an empty field`,
            "any.required": `gender is a required field`,
        }),
        country: Joi.required().messages({
            "string.empty": `country cannot be an empty field`,
            "any.required": `country is a required field`,
        }),
        hobbies: Joi.required().empty().messages({
            "string.empty": `hobbies cannot be an empty field`,
            "any.required": `hobbies is a required field`,
        })


    });
    return schema.validate(req);
}

function validateUserloging(req) {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email().messages({
            "string.base": `Username should be a type of 'text'`,
            "string.empty": `Username cannot be an empty field`,

            "any.required": `Username is a required field`,
        }),
        password: Joi.string().required().empty().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "any.required": `password is a required field`,
        })
    });
    return schema.validate(req);

}
function validateResetPassword(req) {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email().messages({
            "string.base": `Username should be a type of 'text'`,
            "string.empty": `Username cannot be an empty field`,

            "any.required": `Username is a required field`,
        }),
        password: Joi.string().required().empty().messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        repassword: Joi.string().required().empty().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    });
    return schema.validate(req);
}
function validateReset(req) {
    const schema = Joi.object({
        oldPassword: Joi.string().required().empty().messages({
            "string.base": `old password should be a type of 'text'`,
            "string.empty": `old password cannot be an empty field`,
            "any.required": `old password is a required field`,
        }),
        newPassword: Joi.string().required().empty().messages({
            "string.base": `new password should be a type of 'text'`,
            "string.empty": ` new password cannot be an empty field`,
            "any.required": ` new password is a required field`,
        }),
        repassword: Joi.string().required().empty().valid(Joi.ref('newPassword')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    });
    return schema.validate(req);
}
module.exports = {
    validateUser, validateUserloging, validateResetPassword, validateReset
}