require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('mz/fs')
const supertest = require('supertest')
const Product = require('../../models/Product')
const User = require('../../models/User')
const app = require('../../app')
const jwt = require('jsonwebtoken')
const { getAccessTokenByLoginWithMockUser } = require('../functions/helper')
const { createMockAdmin } = require('../functions/helper')
const { connectToDatabase } = require('../functions/helper')
// Link to your server file
let accessToken = null

const mockProduct = {
    category: 'Mock category',
    model: 'Mock model',
    description: 'Mock description',
    price: 10,
    name: 'Mock name',
    color: 'Mock color',
    km: 'Mock km',
}

const request = supertest(app)

beforeAll(() => {
    connectToDatabase()
})

describe('Test authenticated product jwt route', () => {
    beforeEach(async (done) => {
        await User.deleteMany({})
        await Product.deleteMany({})
        const mockAdmin = new User({
            name: 'Mock username',
            email: 'email@mock.com',
            phone: 'mock phone',
            password: 'mock password',
            address: 'mock_address',
            role: 'admin',
        })

        const userId = await mockAdmin.save()._id

        accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: 24 * 60 * 60,
        })

        console.log(process.env.JWT_SECRET)
        console.log(accessToken)

        // Test if the test file is exist
        fs.exists(path.join(__dirname, '..', '/mock/mock.png')).then(
            (exists) => {
                if (!exists) throw new Error('file does not exist')
            }
        )

        done()
    })

    describe('Test post product admin route', () => {
        it('Test post product route', async (done) => {
            const responseContinue = await request
                .post('/api/v1/admin/products/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .field('name', mockProduct.name)
                .field('price', mockProduct.price)
                .field('category', mockProduct.category)
                .field('description', mockProduct.description)
                .field('model', mockProduct.model)
                .field('color', mockProduct.color)
                .field('km', mockProduct.km)
                .attach('image', path.join(__dirname, '..', '/mock/mock.png')) // attaches the file to the form

            expect(responseContinue.statusCode).toBe(201)

            expect(responseContinue.body).toBeTruthy()

            expect(responseContinue.body).toBeInstanceOf(Object)

            expect(responseContinue.body.data).toBeTruthy()

            const products = await Product.find({})

            expect(products.length).toBe(1)

            done()
        })
    })
})

afterAll((done) => {
    mongoose.disconnect(done)
})
