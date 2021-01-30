const { json } = require("express");
const Category = require("./../../models/Category");

/**
 * Get Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Get Category By Id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });
    if (category) {
      res.status(200).json({ data: category });
    } else {
      res.status(404).send({ err: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Post Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    name = name.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const isCategoryExists = await Category.findOne({ name });
    if (isCategoryExists) {
      return res.status(409).send({ msg: "Category already exists" });
    }
    const category = new Category({ name });
    const saved = category.save();
    res.status(201).json({ data: saved });
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Update Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    name = name.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const id = req.params.id;
    const updatedCategory = { name };
    const savedCategory = Category.findOneAndUpdate(
      { _id: id },
      { updatedCategory }
    );
    if (savedCategory) {
      res.status(200).send({ msg: "Category updated" });
    } else {
      res.status(400).send({ err: "Category not found" });
    }
  } catch (err) {
    res.status(400).send({ err: "Category not found" });
  }
};

/**
 * Delete Category
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteCategory = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ err });
  }
};
