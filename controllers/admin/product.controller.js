const Product = require("./../../models/Product");

/**
 * Get Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Get Product By Id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    if (product) {
      res.status(200).json({ data: product });
    } else {
      res.status(404).send({ err: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Post Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postProduct = async (req, res) => {
  try {
    let { model, category, price, description } = req.body;
    model = model.toLowerCase();
    model = model.charAt(0).toUpperCase() + model.slice(1);
    const isProductExists = await Model.findOne({ name });
    if (isProductExists) {
      return res.status(409).send({ msg: "Product already exists" });
    }
    const product = new Product({ model, category, price, description });
    const saved = product.save();
    res.status(201).json({ data: saved });
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Update Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateProduct = async (req, res) => {
  try {
    let { model, category, price, description } = req.body;
    model = model.toLowerCase();
    model = model.charAt(0).toUpperCase() + model.slice(1);
    const id = req.params.id;
    const updatedProduct = { model, category, price, description };
    const savedProduct = Product.findByIdAndUpdate(
      { _id: id },
      { updatedProduct }
    );
    if (savedProduct) {
      res.status(200).send({ msg: "Product updated" });
    } else {
      res.status(400).send({ err: "Product not found" });
    }
  } catch (err) {
    res.status(400).send({ err: "Product not found" });
  }
};

/**
 * Delete Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const isDeleted = Product.findByIdAndDelete({ _id: id });
    if (isDeleted) {
      res.status(200).send({ msg: "Product deleted" });
    } else {
      res.status(404).send({ msg: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};
