require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const supertest = require('supertest')
const Model = require('../../models/Model')
const User = require('../../models/User')
const app = require('../../app')
const { getAccessTokenByLoginWithMockUser } = require('../functions/helper')
const { connectToDatabase } = require('../functions/helper')
const { createMockAdmin } = require('../functions/helper')
// Link to your server file
let accessToken = null

const mockModel = {
    name: 'Mock name',
}

const request = supertest(app)

beforeAll(() => {
    connectToDatabase()
})

describe('Test authenticated model jwt route', () => {
    beforeEach(async (done) => {
        await User.deleteMany({})
        await Model.deleteMany({})
        await createMockAdmin()

        accessToken = await getAccessTokenByLoginWithMockUser()

        done()
    })

    describe('Test post model admin route', () => {
        it('Test post model route will return 401 if not having access token', async (done) => {
            const response = await request.post('/api/v1/admin/models/')

            expect(response.statusCode).toBe(401)

            done()
        })

        it('Test post model route', async (done) => {
            const response = await request
                .post('/api/v1/admin/models/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send(mockModel)

            expect(response.statusCode).toBe(201)

            expect(response.body).toBeTruthy()

            expect(response.body).toBeInstanceOf(Object)

            expect(response.body.data).toBeTruthy()

            const models = await Model.find({})

            expect(models.length).toBe(1)

            done()
        })
    })

    describe('Test delete model admin route', () => {
        it('Test post model route will return 401 if not having access token', async (done) => {
            const response = await request.delete('/api/v1/admin/models/1')

            expect(response.statusCode).toBe(401)

            done()
        })

        it('Test delete model route will return 204 if success deleted', async (done) => {
            await request
                .post('/api/v1/admin/models/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send(mockModel)

            const model = await Model.findOne({ name: 'Mock name' })

            const response = await request
                .delete(`/api/v1/admin/models/${model._id}`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(204)

            expect(response.body).toBeTruthy()

            done()
        })

        it('Test delete model route will return 500 if product _id is not of type object id', async (done) => {
            const response = await request
                .delete(`/api/v1/admin/models/1`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(500)

            done()
        })

        it('Test delete model route will return 404 if model not exists', async (done) => {
            const responseContinue = await request
                .delete(`/api/v1/admin/models/5d6ede6a0ba62570afcedd3a`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(responseContinue.statusCode).toBe(404)

            expect(responseContinue.body).toMatchObject({
                msg: 'Model not found',
            })

            done()
        })
    })
    describe('Test update model admin route', () => {
        it('Test post model route will return 401 if not having access token', async (done) => {
            const response = await request.patch('/api/v1/admin/models/1')

            expect(response.statusCode).toBe(401)

            done()
        })

        it('Test update model route will return 404 if model not exists', async (done) => {
            const response = await request
                .patch(`/api/v1/admin/models/5d6ede6a0ba62570afcedd3a`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send(
                    Object.assign({}, mockModel, { name: 'Updated mock name' })
                )

            expect(response.statusCode).toBe(404)

            expect(response.body).toMatchObject({
                err: 'Model not found',
            })

            done()
        })

        it('Test update model route will return 500 if model _id is bad', async (done) => {
            const response = await request
                .patch(`/api/v1/admin/models/1`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header

            expect(response.statusCode).toBe(500)

            done()
        })

        it('Test update model route will return 200 if model is updated', async (done) => {
            await request
                .post('/api/v1/admin/models/')
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send(mockModel)

            const model = await Model.findOne({ name: 'Mock name' })

            const responseContinue = await request
                .patch(`/api/v1/admin/models/${model._id}`)
                .set('Authorization', `Bearer ${accessToken}`) // Set authentication header
                .send(Object.assign({}, model, { name: 'Updated mock name' }))

            expect(responseContinue.statusCode).toBe(200)

            const modelOld = await Model.findOne({ name: 'Mock name' })

            const modelNew = await Model.findOne({
                name: 'Updated mock name',
            })

            expect(modelOld).toBeNull()

            expect(modelNew).not.toBeNull()

            done()
        })
    })
})

afterAll((done) => {
    mongoose.disconnect(done)
})
