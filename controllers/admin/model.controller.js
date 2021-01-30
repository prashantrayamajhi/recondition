const Model = require("./../../models/Model");

/**
 * Get Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getModel = async (req, res) => {
  try {
    const models = await Model.find();
    res.status(200).json({ data: models });
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Get Model By Id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getModelById = async (req, res) => {
  try {
    const id = req.params.id;
    const model = await Model.findOne({ _id: id });
    if (model) {
      res.status(200).json({ data: model });
    } else {
      res.status(404).send({ err: "Model not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Post Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postModel = async (req, res) => {
  try {
    let { name } = req.body;
    name = name.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const isModelExists = await Model.findOne({ name });
    if (isModelExists) {
      return res.status(409).send({ msg: "Model already exists" });
    }
    const model = new Model({ name });
    const saved = model.save();
    res.status(201).json({ data: saved });
  } catch (err) {
    res.status(500).json({ err });
  }
};

/**
 * Update Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateModel = async (req, res) => {
  try {
    let { name } = req.body;
    name = name.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const id = req.params.id;
    const updatedModel = { name };
    const savedModel = Category.findByIdAndUpdate(
      { _id: id },
      { updatedModel }
    );
    if (savedModel) {
      res.status(200).send({ msg: "Model updated" });
    } else {
      res.status(400).send({ err: "Model not found" });
    }
  } catch (err) {
    res.status(400).send({ err: "Model not found" });
  }
};

/**
 * Delete Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteModel = async (req, res) => {
  try {
    const id = req.params.id;
    const isDeleted = Model.findByIdAndDelete({ _id: id });
    if (isDeleted) {
      res.status(200).send({ msg: "Category deleted" });
    } else {
      res.status(404).send({ msg: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};
