const Product = require('../../models/Product')

/**
 * Get Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ data: products })
    } catch (err) {
        res.status(500).json({ err })
    }
}

/**
 * Get Product By Id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({ _id: id })
        if (product) {
            res.status(200).json({ data: product })
        } else {
            res.status(404).send({ err: 'Product not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

/**
 * Get Three Products
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getProductsByLimit = async (req, res) => {
    let { limit } = req.params
    limit = Number(limit)
    try {
        const products = await Product.find({}, null, { limit })
        res.status(200).json({ data: products })
    } catch (err) {
        res.status(500).json(err)
    }
}

/**
 * Post Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.postProduct = async (req, res) => {
    try {
        let { name, model, price, description } = req.body
        name = name.toLowerCase()
        name = name.trim()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        const images = []
        req.files.forEach((img) => {
            img.path = img.path.slice(7)
            images.push(img.path)
        })
        const product = new Product({
            name,
            images,
            model,
            price,
            description,
        })
        const saved = await product.save()
        res.status(201).json({ data: saved._id })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

/**
 * Update Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.updateProduct = async (req, res) => {
    if (!req.file) {
        return res.status(422).send({ error: 'Image is required !' })
    }
    try {
        const { id } = req.params
        let { name, model, category, price, description } = req.body
        name = name.toLowerCase()
        name = name.trim()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        const updatedProduct = { name, model, category, price, description }
        const savedProduct = await Product.findByIdAndUpdate(
            { _id: id },
            updatedProduct
        )
        if (savedProduct) {
            res.status(200).send({ msg: 'Product updated' })
        } else {
            res.status(404).send({ err: 'Product not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

/**
 * Delete Product
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const isDeleted = await Product.findByIdAndDelete({ _id: id })
        if (isDeleted) {
            return res.status(204).send()
        }
        return res.status(404).send({ msg: 'Product not found' })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}
