if(process.env.NODE_ENV !== 'production'){ 
    require('dotenv').config()
}

// connect to database
require('./db/db')

const app = require('./app');
const PORT = 8080

app.listen(PORT || process.env.PORT, console.log(`Listening on port ${PORT}`))