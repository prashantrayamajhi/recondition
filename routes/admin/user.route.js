const router = require('express').Router()
const passport = require('passport')
const controller = require('../../controllers/admin/user.controller')
const { adminRouteRequired } = require('../../middlewares/checkRole')

// get users route
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    adminRouteRequired,
    controller.getUsers
)

// get user by id route
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    adminRouteRequired,
    controller.getUserById
)

// post user route
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    adminRouteRequired,
    controller.postUser
)

// update user route
router.patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    adminRouteRequired,
    controller.updateUser
)

// delete user route
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    adminRouteRequired,
    controller.deleteUser
)

module.exports = router
