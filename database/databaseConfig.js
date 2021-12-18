require('dotenv').config()

// Explicit connection url to connect to the remote DB "MongoDB Atlas"

// DEV Environment Connection
    module.exports = {
        // eslint-disable-next-line max-len
        databaseURL: `mongodb+srv://minorproject:test@cluster0.znlz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    }

