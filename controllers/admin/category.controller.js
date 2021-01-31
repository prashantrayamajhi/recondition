const Category = require('../../models/Category')

/**
 * Get Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json({ data: categories })
  } catch (err) {
    res.status(500).json({ err })
  }
}

/**
 * Get Category By Id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params
    const category = await Category.findOne({ _id: id })
    if (category) {
      res.status(200).json({ data: category })
    } else {
      res.status(404).send({ err: 'Category not found' })
    }
  } catch (err) {
    res.status(500).json({ err })
  }
}

/**
 * Post Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postCategory = async (req, res) => {
  try {
    let { name } = req.body
    name = name.trim()
    name = name.toLowerCase()
    name = name.charAt(0).toUpperCase() + name.slice(1)
    const categoryExists = await Category.findOne({ name })
    if (categoryExists) {
      return res.status(409).send({ msg: 'Category already exists' })
    }
    const category = new Category({ name })
    const saved = await category.save()
    res.status(201).json({ data: saved })
  } catch (err) {
    res.status(500).json({ err })
  }
}

/**
 * Update Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateCategory = async (req, res) => {
  try {
    let { name } = req.body
    name = name.trim()
    name = name.toLowerCase()
    name = name.charAt(0).toUpperCase() + name.slice(1)
    const { id } = req.params
    const updatedCategory = { name }
    const update = await Category.findByIdAndUpdate(
      { _id: id },
      updatedCategory
    )
    if (update === null) {
      return res.status(404).send({ err: 'Category not found' })
    }
    res.status(200).send({ msg: 'Category updated' })
  } catch (err) {
    res.status(404).send({ err: 'Category not found' })
  }
}

/**
 * Delete Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const isDeleted = await Category.findByIdAndDelete({ _id: id })
    if (isDeleted) {
      res.status(200).send({ msg: 'Category deleted' })
    } else {
      res.status(404).send({ msg: 'Category not found' })
    }
  } catch (err) {
    res.status(404).send({ msg: 'Category not found' })
  }
}
