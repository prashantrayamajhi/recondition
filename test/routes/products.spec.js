require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('mz/fs')
const supertest = require('supertest')
const Product = require('../../models/Product')
const User = require('../../models/User')
const app = require('../../app')
// Link to your server file
let accessToken = null

const mockProduct = {
    category: 'Mock category',
    model: 'Mock model',
    description: 'Mock description',
    price: 10,
    name: 'Mock name',
}

async function createMockAdmin() {
    const mockUser = new User({
        name: 'Mock username',
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
        role: 'admin',
    })

    await mockUser.save()
}

const request = supertest(app)

beforeAll(() => {
    mongoose
        .connect(process.env.DATABASE_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => {
            console.log('Connected to the database')
        })
})

describe('Test authenticated product jwt route', () => {
    beforeEach(async (done) => {
        await User.deleteMany({})
        await Product.deleteMany({})
        await createMockAdmin()

        async function getAccessTokenByLoginWithMockUser() {
            const response = await request
                .post('/api/v1/admin/auth/login')
                .send({
                    email: 'email@mock.com',
                    password: 'mock password',
                })

            expect(response.statusCode).toBe(200)

            expect(response.body).toBeTruthy()

            expect(response.body.accessToken).toBeTruthy()

            accessToken = response.body.accessToken
        }

        await getAccessTokenByLoginWithMockUser()

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
                .attach(
                    'thumbnail',
                    path.join(__dirname, '..', '/mock/mock.png')
                ) // attaches the file to the form

            expect(responseContinue.statusCode).toBe(201)

            expect(responseContinue.body).toBeTruthy()

            expect(responseContinue.body).toBeInstanceOf(Object)

            expect(responseContinue.body.data).toBeTruthy()

            const products = await Product.find({})

            expect(products.length).toBe(1)

            done()
        })
    })

    describe('Test delete product admin route', () => {
        it('Test delete product route will return 204 if success deleted', async (done) => {
            await request
                .post('/api/v1/admin/products/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .field('name', mockProduct.name)
                .field('price', mockProduct.price)
                .field('category', mockProduct.category)
                .field('description', mockProduct.description)
                .field('model', mockProduct.model)
                .attach(
                    'thumbnail',
                    path.join(__dirname, '..', '/mock/mock.png')
                ) // attaches the file to the form

            const product = await Product.findOne({ name: 'Mock name' })

            const responseContinue = await request
                .delete(`/api/v1/admin/products/${product._id}`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send(mockProduct)

            expect(responseContinue.statusCode).toBe(204)

            expect(responseContinue.body).toBeTruthy()

            done()
        })

        it('Test delete product route will return 500 if product _id is not of type object id', async (done) => {
            const responseContinue = await request
                .delete(`/api/v1/admin/products/1`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(responseContinue.statusCode).toBe(500)

            done()
        })

        it('Test delete product route will return 404 if product not exists', async (done) => {
            const responseContinue = await request
                .delete(`/api/v1/admin/products/5d6ede6a0ba62570afcedd3a`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(responseContinue.statusCode).toBe(404)

            expect(responseContinue.body).toMatchObject({
                msg: 'Product not found',
            })

            done()
        })
    })
    describe('Test update product admin route', () => {
        it('Test update product route will return 404 if product not exists', async (done) => {
            const responseContinue = await request
                .patch(`/api/v1/admin/products/5d6ede6a0ba62570afcedd3a`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .field('name', 'updated mock name')
                .attach(
                    'thumbnail',
                    path.join(__dirname, '..', '/mock/mock.png')
                ) // attaches the file to the form

            expect(responseContinue.statusCode).toBe(404)

            expect(responseContinue.body).toMatchObject({
                err: 'Product not found',
            })

            done()
        })

        it('Test update product route will return 500 if product _id is bad', async (done) => {
            const responseContinue = await request
                .patch(`/api/v1/admin/products/1`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .attach(
                    'thumbnail',
                    path.join(__dirname, '..', '/mock/mock.png')
                ) // attaches the file to the form

            expect(responseContinue.statusCode).toBe(500)

            done()
        })

        it('Test update product route will return 200 if product is updated', async (done) => {
            await request
                .post('/api/v1/admin/products/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .field('name', mockProduct.name)
                .field('price', mockProduct.price)
                .field('category', mockProduct.category)
                .field('description', mockProduct.description)
                .field('model', mockProduct.model)
                .attach(
                    'thumbnail',
                    path.join(__dirname, '..', '/mock/mock.png')
                ) // attaches the file to the form

            const product = await Product.findOne({ name: 'Mock name' })

            const responseContinue = await request
                .patch(`/api/v1/admin/products/${product._id}`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .field('name', 'Updated mock name')
                .attach(
                    'thumbnail',
                    path.join(__dirname, '..', '/mock/mock.png')
                ) // attaches the file to the form

            expect(responseContinue.statusCode).toBe(200)

            const productOld = await Product.findOne({ name: 'Mock name' })

            const productNew = await Product.findOne({
                name: 'Updated mock name',
            })

            expect(productOld).toBeNull()

            expect(productNew).not.toBeNull()

            done()
        })
    })
})

afterAll((done) => {
    mongoose.disconnect(done)
})
