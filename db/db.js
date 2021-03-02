const mongoose = require('mongoose')

module.exports = mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('Connected to the database')
    })
