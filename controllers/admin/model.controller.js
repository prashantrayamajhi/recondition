const Model = require('../../models/Model')

/**
 * Get Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getModel = async (req, res) => {
    try {
        const models = await Model.find()
        res.status(200).json({ data: models })
    } catch (err) {
        res.status(500).json({ err })
    }
}

/**
 * Get Model By Id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getModelById = async (req, res) => {
    try {
        const { id } = req.params
        const model = await Model.findOne({ _id: id })
        if (model) {
            res.status(200).json({ data: model })
        } else {
            res.status(404).send({ err: 'Model not found' })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

/**
 * Post Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postModel = async (req, res) => {
    try {
        let { name } = req.body
        name = name.trim()
        name = name.toLowerCase()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        const modelExists = await Model.findOne({ name })
        if (modelExists) {
            return res.status(409).send({ msg: 'Model already exists' })
        }
        const model = new Model({ name })
        const saved = await model.save()
        res.status(201).json({ data: saved })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}

/**
 * Update Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateModel = async (req, res) => {
    try {
        let { name } = req.body
        name = name.trim()
        name = name.toLowerCase()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        const updatedModel = { name }
        const { id } = req.params
        if (name.length > 0) {
            await Model.findByIdAndUpdate({ _id: id }, updatedModel)
            return res.status(200).send({ msg: 'Model updated' })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

/**
 * Delete Model
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteModel = async (req, res) => {
    try {
        const { id } = req.params
        const isDeleted = await Model.findByIdAndDelete({ _id: id })
        if (isDeleted) {
            res.status(204).send({ msg: 'Model deleted' })
        } else {
            res.status(404).send({ msg: 'Model not found' })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
