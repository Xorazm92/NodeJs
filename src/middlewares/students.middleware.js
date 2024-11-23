import { studentValidator } from "../validators/index.js";

export const validateStudent = (req, res, next) => {
    const { error } = studentValidator(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map((err) => err.message),
        })
    }
    next()
}