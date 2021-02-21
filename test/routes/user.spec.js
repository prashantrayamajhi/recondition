require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const fs = require('mz/fs')
const supertest = require('supertest')
const Product = require('../../models/Product')
const User = require('../../models/User')
const app = require('../../app')
const { getAccessTokenByLoginWithMockUser } = require('../functions/helper')
// Link to your server file
let accessToken = null

const { createMockAdmin, connectToDatabase } = require('../functions/helper')

const request = supertest(app)

beforeAll(() => {
    connectToDatabase()
})

describe('Test authenticated user jwt route', () => {
    beforeEach(async (done) => {
        await User.deleteMany({})
        await createMockAdmin()

        accessToken = await getAccessTokenByLoginWithMockUser()

        // Test if the test file is exist
        fs.exists(path.join(__dirname, '..', '/mock/mock.png')).then(
            (exists) => {
                if (!exists) throw new Error('file does not exist')
            }
        )

        done()
    })

    describe('Test get users admin route', () => {
        it('Test get users route will return status of 200 and array if has access token of admin', async (done) => {
            const responseContinue = await request
                .get('/api/v1/admin/users')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(responseContinue.body).toBeTruthy()

            expect(responseContinue.statusCode).toBe(200)

            expect(responseContinue.body.data).toBeInstanceOf(Array)

            done()
        })

        it('Test get users route will return status of 401 and array if not have access token', async (done) => {
            const responseContinue = await request.get('/api/v1/admin/users')

            expect(responseContinue.statusCode).toBe(401)

            done()
        })
    })

    describe('Test post user admin route', () => {
        it('Test post user route will have status of 201 if everything ok', async (done) => {
            let users = await User.find({})

            expect(users.length).toBe(1)

            const responseContinue = await request
                .post('/api/v1/admin/users/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send({
                    name: 'Mock username 1',
                    email: 'email1@mock.com',
                    phone: 'mock phone 1',
                    password: 'mock password 1',
                    address: 'mock_address 1',
                    role: 'co-admin',
                })

            expect(responseContinue.statusCode).toBe(201)

            expect(responseContinue.body).toBeTruthy()

            expect(responseContinue.body).toBeInstanceOf(Object)

            expect(responseContinue.body.data).toBeTruthy()

            users = await User.find({})

            expect(users.length).toBe(2)

            done()
        })

        it('Test post user route will have status of 409 if user existed', async (done) => {
            const responseContinue = await request
                .post('/api/v1/admin/users/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send({
                    name: 'Mock username',
                    email: 'email@mock.com',
                    phone: 'mock phone 1',
                    password: 'mock password 1',
                    address: 'mock_address 1',
                    role: 'co-admin',
                })

            expect(responseContinue.statusCode).toBe(409)

            done()
        })
    })

    describe('Test get user by id admin route', () => {
        it('Test get user by id will have status of 401 if not have access', async (done) => {
            const response = await request.get(
                `/api/v1/admin/users/5d6ede6a0ba62570afcedd3a`
            )

            expect(response.statusCode).toBe(401)

            done()
        })

        it('Test get user by id route will have status of 200 if everything ok', async (done) => {
            await request
                .post('/api/v1/admin/users/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send({
                    name: 'Mock username 1',
                    email: 'email1@mock.com',
                    phone: 'mock phone 1',
                    password: 'mock password 1',
                    address: 'mock_address 1',
                    role: 'co-admin',
                })

            user = await User.findOne({ email: 'email1@mock.com' })

            const response = await request
                .get(`/api/v1/admin/users/${user._id}`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(200)

            expect(response.body.data).toBeTruthy()

            expect(response.body.data).toBeInstanceOf(Object)

            done()
        })

        it('Test get user by id route will have status of 404 if user not existed', async (done) => {
            const response = await request
                .get(`/api/v1/admin/users/5d6ede6a0ba62570afcedd3a`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(404)

            done()
        })

        it('Test get user by id route will have status of 500 if user _id is not correct', async (done) => {
            const response = await request
                .get(`/api/v1/admin/users/1`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(500)

            done()
        })
    })

    describe('Test delete user admin route', () => {
        it('Test delete user route will have status of 401 if not have access', async (done) => {
            const response = await request.delete(
                `/api/v1/admin/users/5d6ede6a0ba62570afcedd3a`
            )

            expect(response.statusCode).toBe(401)

            done()
        })

        it('Test delete user route will have status of 404 if user not found', async (done) => {
            const response = await request
                .delete(`/api/v1/admin/users/5d6ede6a0ba62570afcedd3a`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(404)

            done()
        })

        it('Test delete user route will have status of 500 if user _id is not correct', async (done) => {
            const response = await request
                .delete(`/api/v1/admin/users/1`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(500)

            done()
        })

        it('Test delete user route will have status of 201 if everything ok', async (done) => {
            let users = await User.find({})

            expect(users.length).toBe(1)

            await request
                .post('/api/v1/admin/users/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send({
                    name: 'Mock username 1',
                    email: 'email1@mock.com',
                    phone: 'mock phone 1',
                    password: 'mock password 1',
                    address: 'mock_address 1',
                    role: 'co-admin',
                })

            users = await User.find({})

            expect(users.length).toBe(2)

            const responseContinue = await request
                .delete(`/api/v1/admin/users/${users[1]._id}`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(responseContinue.statusCode).toBe(204)

            users = await User.find({})

            expect(users.length).toBe(1)

            done()
        })
    })
})

afterAll((done) => {
    mongoose.disconnect(done)
})
