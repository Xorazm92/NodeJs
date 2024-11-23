import { userValidator } from "../validators/index.js";

export const validateUser = (req, res, next) => {
    const { error } = userValidator(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map((err) => err.message),
        })
    }
    next()
}