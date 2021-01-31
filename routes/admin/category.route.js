const router = require('express').Router()
const passport = require('passport')
const controller = require('../../controllers/admin/category.controller')
const { adminRouteRequired } = require('../../middlewares/checkRole')

// get category route
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.getCategories
)

// get category by id route
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.getCategoryById
)

// post category route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.postCategory
)

// update category
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.updateCategory
)

// delete category
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.deleteCategory
)

module.exports = router
