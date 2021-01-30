/**
 * Check if user is admin or not
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.adminRouteRequired = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).send({ err: "Not authorized" });
  }
};
