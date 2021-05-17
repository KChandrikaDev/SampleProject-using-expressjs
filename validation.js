const Joi = require('joi');
const regValidation= data =>{
    const shcema= Joi.object({
        name:Joi.string()
        .alphanum()
        .min(3)
        .required(),
    });
    return shcema.validate(data);
};
module.exports.regValidation=regValidation;