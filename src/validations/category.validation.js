import Joi from 'joi'


export const categoryValidation = (data) => {
    const validation = Joi.object({
        name: Joi.string().required(), 
        description :Joi.string().required(), 
        tag : Joi.string().required()
    })
    return validation.validate(data)
}
