const express = require('express')
const router = express.Router()
const _ = require('lodash')

const { User } = require('../models/User')
const { authenticateUser } = require('../middlewares/authentication')

// localhost:3002/users/register
router.post('/register', function(req, res) {
    const body = req.body
    const user = new User(body)
    console.log('UserController', user.isNew)
    // pre-hook --> password encryption
    user.save()
        .then(function(user){
            console.log('UserController', user.isNew)
            // res.send(user)
            res.send(_.pick(user, ['_id', 'username', 'email', 'createdAt']))
        })
        .catch(function(err){
            res.send(err)
        })
})

// localhost:3002/users/login
router.post('/login', function(req, res) {
    const body = req.body

    // findByCredentials - is a user-defined static methods
    // generateToken - is a user-defined instance methods
    User.findByCredentials(body.email, body.password)
        .then(function(user){
            return user.generateToken()
            // res.send(user)
        })
        .then(function(token){
            res.send({ token })
        })
        .catch(function(err){
            res.send(err)
        })
})

// localhost:3000/users/account
router.get('/account', authenticateUser, function(req, res){
    const { user } = req
    // res.send(user)
    res.send(_.pick(user, ['_id', 'username', 'email', 'createdAt']))
})

// localhost:3002/users/logout
router.delete('/logout', authenticateUser, function(req, res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: {tokens: { token: token }}})
        .then(function(){
            res.send({notice: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    usersRouter: router
}