require('dotenv').config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') // Link to your server file

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

afterAll((done) => {
    mongoose.disconnect(done)
})

it('Gets the stupid endpoint will return a 404 status', async (done) => {
    const response = await request.get('/test')

    expect(response.statusCode).toBe(404)

    expect(response.body).toMatchObject({ error: 'Nothing here' })
    // ...
    done()
})
