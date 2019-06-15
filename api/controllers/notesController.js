const express = require('express')
const router = express.Router()
const Note = require('../models/note')

const { authenticateUser } = require('../middlewares/authentication')

router.get('/', authenticateUser, (req, res) => {
    const { user } = req
    Note.find({ user: user._id})
        .then((notes) => {
            res.send(notes)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', authenticateUser, (req,res) => {
    const { user } = req
    const body = req.body
    const note = new Note(body)
    note.user = user._id
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Note.findOne({
        user: req.user._id,
        _id: id
    }).populate('category', ['name'])
        .then((note) => {
            if(!note) {
                res.send({})
            } else {
                res.send(note)
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    Note.findOneAndDelete({ user: user._id, _id: id })
        .then((note) => {
            res.send(note)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    const body = req.body
    Note.findOneAndUpdate({ user: req.user._id, _id: id }, { $set: body }, { new: true, runValidators: true })
        .then((note) => {
            if(!note){
                res.send({})
            }
            res.send(note)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    notesRouter: router
}