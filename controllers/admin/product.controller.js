const Product = require('../../models/Product')
const capitalize = require('./../../helpers/capitalize')

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
 * Get Dynamic number of products
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
        let { name, price, model, option, color, km, description } = req.body
        name = capitalize(name)

        if (option) {
            option = capitalize(option)
        }
        color = capitalize(color)
        description = capitalize(description)

        const images = []
        req.files.forEach((img) => {
            img.path = img.path.slice(7)
            images.push(img.path)
        })
        const product = new Product({
            name,
            model,
            price,
            option,
            color,
            km,
            images,
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
    if (req.body.image) {
        console.log(req.body.image)
        req.body.image.forEach((img) => {
            console.log(img)
            images.push(img)
        })
    }
    try {
        const { id } = req.params
        let { name, price, model, option, color, km, description } = req.body
        const images = []
        if (req.files.length > 0) {
            console.log('files')
            console.log(req.files)
            req.files.forEach((img) => {
                img.path = img.path.slice(7)
                images.push(img.path)
            })
        }
        if (req.body.image) {
            // console.log(req.body.image)
            req.body.image.forEach((img) => {
                images.push(img)
            })
        }
        if (!(await Product.findOne({ _id: id }))) {
            return res.status(404).json({ err: 'Product not found' })
        }

        if (name) {
            name = capitalize(name)
        }

        if (option) {
            option = capitalize(option)
        }

        if (color) {
            color = capitalize(color)
        }
        if (description) {
            description = capitalize(description)
        }

        const updatedProduct = {
            name,
            model,
            option,
            color,
            km,
            price,
            description,
            images,
        }

        const savedProduct = await Product.findByIdAndUpdate(
            { _id: id },
            updatedProduct
        )
        if (savedProduct) {
            res.status(200).send({ msg: 'Product updated' })
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
