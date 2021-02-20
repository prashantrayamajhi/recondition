const EmailService = require('../../services/EmailService')

exports.sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body
    try {
        await EmailService.sendEmail(name, email, subject, message)
        res.status(200).json({ data: 'Success' })
    } catch (err) {
        res.status(500).json({ err })
    }
}
