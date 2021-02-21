const User = require('../../models/User')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)

module.exports.createMockAdmin = async function createMockAdmin() {
    const mockAdmin = new User({
        name: 'Mock username',
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
        role: 'admin',
    })

    await mockAdmin.save()
}

module.exports.connectToDatabase = function connectToDatabase() {
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
}

module.exports.getAccessTokenByLoginWithMockUser = async function getAccessTokenByLoginWithMockUser() {
    const response = await request.post('/api/v1/admin/auth/login').send({
        email: 'email@mock.com',
        password: 'mock password',
    })

    return response.body.accessToken
}
