const router = require('express').Router()
const passport = require('passport')
const controller = require('../../controllers/admin/product.controller')
const { adminAndCoAdminRouteRequired } = require('../../middlewares/checkRole')
const upload = require('../../middlewares/multer')

// get product route
router.get('/', controller.getProducts)

// get product by id route
router.get('/:id', controller.getProductById)

// post product route
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  upload.single('thumbnail'),
  controller.postProduct
)

// update product route
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  upload.single('thumbnail'),
  controller.updateProduct
)

// delete product route
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  adminAndCoAdminRouteRequired,
  controller.deleteProduct
)

module.exports = router
