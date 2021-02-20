const router = require('express').Router()
const controller = require('../../controllers/client/email.controller')

// send email
router.post('/', controller.sendEmail)

module.exports = router
