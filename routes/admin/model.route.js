const router = require("express").Router();
const controller = require("./../../controllers/admin/model.controller");
const { adminRouteRequired } = require("./../../middlewares/checkRole");
const passport = require("passport");

// get model route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminRouteRequired,
  controller.getModel
);

// get model by id route
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminRouteRequired,
  controller.getModelById
);

// post model route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  adminRouteRequired,
  controller.postModel
);

// update model route
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminRouteRequired,
  controller.updateModel
);

// delete model route
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  adminRouteRequired,
  controller.deleteModel
);

module.exports = router;
