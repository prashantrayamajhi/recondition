const jwt = require('jsonwebtoken')

/**
 * Sign jwt
 * @param userId the user id
 */
module.exports.signJwt = (userId) =>
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
