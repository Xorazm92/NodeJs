const Joi = require("joi");

exports.userValidation = (data) => {
  const schemaUser = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
    confirm_password: Joi.ref("password"),
    info: Joi.string(),
    photo: Joi.string().default("/author/avatar.png"),
    created_date: Joi.date().default(Date.now),
    updated_date: Joi.date(),
    is_active: Joi.boolean().default(false),
    token: Joi.string(),
    activation_link: Joi.string(),
  });

  return schemaUser.validate(data, {abortEarly: false});
}