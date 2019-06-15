const express = require('express')
const app = express()
const mongoose = require('./config/database')
const cors = require('cors')

const path = require("path");
const port = process.env.PORT || 3001
app.use(express.static(path.join(__dirname,"client/build")))

const { usersRouter } = require('./api/controllers/UsersController')
const { notesRouter } = require('./api/controllers/notesController')
const { categoryRouter } = require('./api/controllers/categoriesController')

app.use(express.json())
app.use(cors())



app.use('/users', usersRouter)
app.use('/notes', notesRouter)
app.use('/categories', categoryRouter)

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(port, () => {
    console.log('my-notes server at: ', port)
})