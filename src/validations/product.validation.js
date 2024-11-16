import Joi from 'joi'


export const productsValidation = (data) => {
    const validation = Joi.object({
        category_id: Joi.number().required(),
        title : Joi.string().required(),
        picture :Joi.string().required(),
        sammary :Joi.string().required(),
        description :Joi.string().required(),
        price : Joi.Joi.number().required(),
        discount_type :Joi.string().required(),
        discount_value :Joi.number().required(),
        tags :Joi.string().required(),
    })
    return validation.validate(data)
}
