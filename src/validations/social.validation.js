import { object, string } from "joi";

export function socialValidation(data) {
    const schemaSocial = object({
        social_name: string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.empty": "Kategoriya nomi bo'sh bo'lishi mumkin emas",
                "any.required": "Kategoriya nomini albatta kiritish shart!",
                "string.min": "Kategoriya nomi 2ta harfdan ko'p bo'lishi kerak",
            }),
        social_icon_file: string().optional(), 
    });

    return schemaSocial.validate(data, { abortEarly: false });
}
