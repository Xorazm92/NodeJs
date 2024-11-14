import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rayadunia2021@gmail.com",
        pass: process.env.APP_PASSWORD,
    },
});
const mailOptions = {
    from: "rayadunia2021@gmail.com",
    to: "mmvatx@gmail.com",
    subject: "amalladik",
    text: "bu ketishdi bir nima bo'ladi",
};
export const sendMail = (to, subject, text) => {
    transporter.sendMail(
        {
            from: "rayadunia2021@gmail.com",
            to,
            subject,
            text,
        },
        function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        }
    );
};
