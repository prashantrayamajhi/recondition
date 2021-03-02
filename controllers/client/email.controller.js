const EmailService = require('../../services/EmailService')

exports.sendEmail = async (req, res) => {
    const { email, subject, message } = req.body
    try {
        await EmailService.sendEmail(email, subject, message)
        return res.status(200).json({ data: 'Success' })
    } catch (err) {
        res.status(500).json({ err })
    }
}
