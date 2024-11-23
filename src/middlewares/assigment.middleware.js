import { assigmentValidator } from "../validators/index.js";

export const validateAssigment = (req, res, next) => {
    const { error } = assigmentValidator(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map((err) => err.message),
        })
    }
    next()
}