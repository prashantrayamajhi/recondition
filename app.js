const express = require('express')

const app = express()

const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const AuthRoutes = require('./routes/admin/auth.route')
const CategoryRoute = require('./routes/admin/category.route')
const ModelRoute = require('./routes/admin/model.route')
const ProductRoute = require('./routes/admin/product.route')
const UserRoute = require('./routes/admin/user.route')

app.use(logger('dev'))

//
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Passport middleware
app.use(passport.initialize({}))

// passport config
require('./security/passport')(passport)

// route middlewares
app.use('/api/v1/admin/auth', AuthRoutes)
app.use('/api/v1/admin/categories', CategoryRoute)
app.use('/api/v1/admin/models', ModelRoute)
app.use('/api/v1/admin/products', ProductRoute)
app.use('/api/v1/admin/users', UserRoute)

app.use('*', (req, res) => res.status(404).json({ error: 'Nothing here' }))

module.exports = app
