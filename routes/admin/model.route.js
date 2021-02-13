const router = require('express').Router()
const passport = require('passport')
const controller = require('../../controllers/admin/model.controller')
const { adminAndCoAdminRouteRequired } = require('../../middlewares/checkRole')

// get model route
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  controller.getModel
)

// get model by id route
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  controller.getModelById
)

// post model route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  controller.postModel
)

// update model route
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  controller.updateModel
)

// delete model route
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  controller.deleteModel
)

module.exports = router
