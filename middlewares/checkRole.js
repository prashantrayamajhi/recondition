/**
 * Check if user is admin or not
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.adminRouteRequired = (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    return res.status(401).send({ err: 'Not authorized' })
  }
}

/**
 * Check if user is admin or co-admin or not
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.adminAndCoAdminRouteRequired = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'co-admin') {
    next()
  } else {
    return res.status(401).send({ err: 'Not authorized' })
  }
}
