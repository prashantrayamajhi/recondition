const bcrypt = require('bcrypt')
const { userDataSchema } = require('../../validations/userSchema')

const User = require('../../models/User')
const { signJwt } = require('../../helpers/jwt')

/**
 * Login the user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postLogin = async (req, res) => {
  // Destructuring email and password from request body
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).send({ error: 'Invalid Email' })
    }
    // Check if password matched or not
    const isMatch = await bcrypt.compare(password, user.password)
    // if password matched
    if (isMatch) {
      // Then sign token
      const token = signJwt(user._id)
      // And send to response
      return res.status(200).json({
        email: user.email,
        userId: user._id,
        accessToken: token,
      })
    }
    return res.status(401).send({ error: 'Invalid Password' })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ err })
  }
}

/**
 * Signup the user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postSignup = async (req, res) => {
  try {
    // get name email address phone password from request body
    const { name, email, address, phone, password } = req.body

    const data = { name, email, address, phone, password }

    try {
      await userDataSchema.validateAsync(data)
    } catch (e) {
      return res.status(500).json(e)
    }

    const userWithTheEmail = await User.findOne({ email })
    // If email is in the database
    if (userWithTheEmail) {
      return res.status(409).send({ err: 'Email already registered' })
    }
    // Create the user
    const user = new User({
      name,
      email,
      phone,
      address,
      password,
      role: 'staff',
    })

    // Save the user
    await user.save()
    // Return status of created if successful
    return res.status(201).json({ message: 'Successfully signed up' })
  } catch (err) {
    // console.log(err)
    return res.status(500).json(err)
  }
}
