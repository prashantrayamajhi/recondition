const router = require('express').Router()
const controller = require('../../controllers/client/email.controller')

// get users route
router.get('/', controller.sendEmail)

module.exports = router
