import Joi from "joi";

const categoryChek = Joi.object({
  name: Joi.string().alphanum().min(3).max(100).required(),
});

export default (data) => categoryChek.validate(data)
