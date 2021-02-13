const User = require('../../models/User')

/**
 * Get Users
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ data: users })
  } catch (err) {
    res.status(500).json({ err })
  }
}

/**
 * Get user by id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
    if (user) {
      res.status(200).json({ data: user })
    } else {
      res.status(404).send({ err: 'User not found' })
    }
  } catch (err) {
    res.status(404).send({ err: 'User not found' })
  }
}

/**
 * Post User
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postUser = async (req, res) => {
  try {
    let { name, email, phone, address, role, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(409).send({ msg: 'User already exists' })
    }
    const user = new User({ name, email, phone, address, role, password })
    const saved = await user.save()
    res.status(201).json({ data: saved })
  } catch (err) {
    res.status(500).json({ err })
  }
}

/**
 * Update User
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateUser = async (req, res) => {
  try {
    let { name, email, phone, address, role } = req.body
    const { id } = req.params
    const updatedUser = { name, email, phone, address, role }
    const savedUser = await User.findByIdAndUpdate({ _id: id }, updatedUser)
    if (savedUser) {
      res.status(200).send({ msg: 'User updated' })
    } else {
      res.status(400).send({ err: 'User not found' })
    }
  } catch (err) {
    res.status(400).send({ err: 'User not found' })
  }
}

/**
 * Delete User
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const isDeleted = await User.findByIdAndDelete({ _id: id })
    if (isDeleted) {
      res.status(200).send({ msg: 'User deleted' })
    } else {
      res.status(404).send({ msg: 'User not found' })
    }
  } catch (err) {
    res.status(404).send({ msg: 'User not found' })
  }
}
