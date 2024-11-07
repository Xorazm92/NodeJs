import Joi from "joi";

const autherChek = Joi.object({
  name: Joi.string().alphanum().min(3).max(100).required(),
});

export default (data) => autherChek.validate(data);
