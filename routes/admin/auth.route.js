const router = require('express').Router()
const controller = require('../../controllers/admin/auth.controller')

// post login route
router.post('/login', controller.postLogin)

// post signup route
router.post('/signup', controller.postSignup)

module.exports = router
