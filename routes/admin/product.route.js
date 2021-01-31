const router = require('express').Router()
const passport = require('passport')
const controller = require('../../controllers/admin/product.controller')
const { adminRouteRequired } = require('../../middlewares/checkRole')

// get product route
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.getProducts
)

// get product by id route
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.getProductById
)

// post product route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.postProduct
)

// update product route
router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.updateProduct
)

// delete product route
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminRouteRequired,
  controller.deleteProduct
)

module.exports = router
