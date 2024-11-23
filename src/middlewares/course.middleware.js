import { courseValidator } from "../validators/index.js";

export const validateCourse = (req, res, next) => {
    const { error } = courseValidator(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map((err) => err.message),
        })
    }
    next()
}