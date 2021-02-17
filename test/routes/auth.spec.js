require('dotenv').config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../../models/User')
const app = require('../../app') // Link to your server file

const request = supertest(app)

beforeAll(async () => {
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

describe('Test authentication route', () => {
  describe('Test signup route', () => {
    beforeEach(async () => {
      await User.deleteMany({})
    })

    it('Test signup route will be ok', async (done) => {
      await User.deleteMany({})

      const response = await request.post('/api/v1/admin/auth/signup').send({
        name: 'Mock username',
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
        city: 'mock city',
        role: 'admin',
      })

      expect(response.statusCode).toBe(201)

      expect(response.body).toBeTruthy()

      expect(response.body).toMatchObject({ message: 'Successfully signed up' })
      // ...
      done()
    })

    it('Test signup route not working if email is already registered', async (done) => {
      await User.deleteMany({ email: 'email@mock.com' })

      const mockUser = new User({
        name: 'Mock username',
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
        city: 'mock city',
        role: 'admin',
      })

      await mockUser.save()

      const response = await request.post('/api/v1/admin/auth/signup').send({
        name: 'Mock username',
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
        city: 'mock city',
        role: 'admin',
      })

      expect(response.statusCode).toBe(409)

      expect(response.body).toBeTruthy()

      expect(response.body).toMatchObject({ err: 'Email already registered' })
      // ...
      done()
    })
  })

  describe('Test login route', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const mockUser = new User({
        name: 'Mock username',
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
        city: 'mock city',
        role: 'admin',
      })

      await mockUser.save()
    })

    it('Test login route return unsuccessful if email is wrong', async (done) => {
      const response = await request.post('/api/v1/admin/auth/login').send({
        email: 'emailfalse@mock.com',
        password: 'mock password',
      })

      expect(response.statusCode).toBe(401)

      expect(response.body).toBeTruthy()

      expect(response.body).toMatchObject({ error: 'Invalid Email' })

      // ...
      done()
    })

    it('Test login route return unsuccessful if password is wrong', async (done) => {
      const response = await request.post('/api/v1/admin/auth/login').send({
        email: 'email@mock.com',
        password: 'mock password false',
      })

      expect(response.statusCode).toBe(401)

      expect(response.body).toBeTruthy()

      expect(response.body).toMatchObject({ error: 'Invalid Password' })

      // ...
      done()
    })

    it('Test login route return successful', async (done) => {
      const response = await request.post('/api/v1/admin/auth/login').send({
        email: 'email@mock.com',
        password: 'mock password',
      })

      expect(response.statusCode).toBe(200)

      expect(response.body).toBeTruthy()

      expect(response.body.accessToken).toBeTruthy()

      // ...
      done()
    })
  })
})

afterAll(async (done) => {
  await mongoose.disconnect(done)
})
