const express = require('express')
const app = express()
const mongoose = require('./config/database')
const cors = require('cors')

const { usersRouter } = require('./api/controllers/UsersController')
const { notesRouter } = require('./api/controllers/notesController')
const { categoryRouter } = require('./api/controllers/categoriesController')

const port = 3001
app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
app.use('/notes', notesRouter)
app.use('/categories', categoryRouter)

app.listen(port, () => {
    console.log('my-notes server at: ', port)
})