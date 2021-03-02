const express = require('express')

const app = express()

const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')

const AuthRoutes = require('./routes/admin/auth.route')
const ProductRoute = require('./routes/admin/product.route')
const UserRoute = require('./routes/admin/user.route')
const ClientMailRoute = require('./routes/client/mail.route')

app.use(logger('dev'))

//
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

// app.use('/images', express.static(__dirname + '/images'))
app.use('/images', express.static(path.join(__dirname, 'images')))

// Passport middleware
app.use(passport.initialize({}))

// passport config
require('./security/passport')(passport)

// route middlewares
app.use('/api/v1/admin/auth', AuthRoutes)
app.use('/api/v1/admin/products', ProductRoute)
app.use('/api/v1/admin/users', UserRoute)
app.use('/api/v1/client/mail', ClientMailRoute)

app.use('*', (req, res) => res.status(404).json({ error: 'Nothing here' }))

module.exports = app
