const express = require('express')
const app = express()

const AuthRoutes = require('./routes/admin/auth.route')
const CategoryRoute = require('./routes/admin/category.route')
const ModelRoute = require('./routes/admin/model.route')
const ProductRoute = require('./routes/admin/product.route')
const UserRoute = require('./routes/admin/user.route')

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// route middlewares
app.use('/api/v1/admin/auth', AuthRoutes)
app.use("/api/v1/admin/category", CategoryRoute);
app.use("/api/v1/admin/model", ModelRoute);
app.use("/api/v1/admin/product", ProductRoute);
app.use("/api/v1/admin/user", UserRoute);

module.exports = app