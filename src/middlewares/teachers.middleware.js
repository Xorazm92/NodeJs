import { teacherValidator } from "../validators/index.js";

export const validateTeacher = (req, res, next) => {
    const { error } = teacherValidator(req.body)
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map((err) => err.message),
        })
    }
    next()
}