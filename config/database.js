const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/my-notes'
const connection_uri = `mongodb+srv://admin_67:admin_67@cluster0-pg9f0.mongodb.net/test?retryWrites=true&w=majority`
mongoose.Promise = global.Promise

mongoose.connect(connection_uri, { useNewUrlParser: true })
    .then(() => {
        console.log('my-notes database: connected')
    })
    .catch((err) => {
        console.log('my-notes database: error')
    })

module.exports = mongoose