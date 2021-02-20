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
            from: 'any@any.com', // sender address
            to: 'true@true.com', // list of receivers
            subject: 'test mail', // Subject line
            html: '<h1>this is a test mail.</h1>', // plain text body
        }

        try {
            const info = await transporter.sendMail(mailOptions)
            console.log(info)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
