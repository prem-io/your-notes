const express = require('express')
const router = express.Router()

const Category = require('../models/category')

router.get('/', (req, res) => {
    Category.find()
        .then((categories) => {
            res.send(categories)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.save()
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id).populate('notes.note', ['title'])
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Category.findByIdAndDelete(id)
        .then((category) => {
            res.send(category)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    categoryRouter: router
}