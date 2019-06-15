const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/my-notes'

mongoose.Promise = global.Promise

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('my-notes database: connected')
    })
    .catch((err) => {
        console.log('my-notes database: error')
    })

module.exports = mongoose