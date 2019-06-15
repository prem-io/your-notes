const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = require('./category')

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

// mongoose middleware - post('save')
NoteSchema.post('save', function(next){
    const note = this
    Category.findById(note.category)
        .then((category) => {
            category.notes.push({
                note: note._id
            })
            category.save()
            .then(function(){
                next()
            })
        })
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note