const router = require('express').Router()
const controller = require('../../controllers/client/mail.controller')

// get users route
router.get('/', controller.sendEmail)

module.exports = router
