import db from "../database/index.js";
import { sendMail } from "../utils/index.js";

export const authContoller = async (req, res, next) => {
    try {
        if (!req.user) return res.redirect("/");
        const newUser = {
            name: req.user.displayName,
            email: req.user.emails[0].value,
            password: req.user.id
        }
        console.log(newUser);
        const currentUser = await db.select().from('users').where('email', '=', req.user.emails[0].value)
        if(currentUser.length !== 0){
            return res.status(200).send(`<h1>Salom, ${req.user.displayName}</h1>`);
        }
        await db('users').insert(newUser)
        return res.status(200).send(`<h1>Salom, ${req.user.displayName}</h1>`);
    } catch (error) {
        next(error)
    }
};



export const otpController = async (req, res, next) => {
    try {
        if (!req.user) return res.redirect("/");
        const user = req.user
        const link = `http://localhost:3000/auth/vrifayOtp/${user.id}`
        await sendMail(req.user.emails[0].value, 'active', link)
        return res.status(200).send(`<h1>Salom, ${req.user.displayName} active link emailingizga yuborildi</h1>`);
    } catch (error) {
        next(error)
    }
};


export const otpVrifay = async (req, res, next) => {
    try {
        res.redirect('/profile')
    } catch (error) {
        next(error)
    }
};
