const nodemailer = require('nodemailer')

module.exports = class EmailService {
    static async sendEmail(name, email, subject, message) {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD,
            },
        })
        const mailOptions = {
            from: email, // sender address
            to: process.env.GMAIL_EMAIL, // list of receivers
            subject: subject, // Subject line
            html: message, // plain text body
        }

        try {
            const info = await transporter.sendMail(mailOptions)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
