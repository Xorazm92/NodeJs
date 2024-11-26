import { AppError } from "../utils/index.js"

export const checkValidatioin = (validation) =>{
    return (req, res, next) =>{
        try {
            const body = req.body
            validation.parse(body)
            next()
        } catch (error) {
            console.log(error);
            
            throw new AppError(error['message'], 400)
        }
    }
}
export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }
  