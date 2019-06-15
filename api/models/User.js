const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'invalid email format'
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

// pre hooks - Model Middleware (mongoose)
userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10, function(err, salt){
            bcryptjs.hash(user.password, salt, function(err, encryptedPassword){
                user.password = encryptedPassword
                next()                
            })
        })
    } else {
        next()
    }
})

// own instance methods
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }

    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({ token }) // es6 concise property

    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}

// user-defined (own) static method
userSchema.statics.findByCredentials = function(email, password){
    const User = this
    return User.findOne({ email }) // es6 concise property --> ({ email: email})
                .then(function(user){
                    if(!user){
                        return Promise.reject({errors: 'invalid email / password'})
                    }

                    return bcryptjs.compare(password, user.password)
                                .then(function(result){
                                    if(result){
                                        return Promise.resolve(user)
                                    } else {
                                        return Promise.reject({errors: 'invalid email / password'})
                                    }
                                })
                })
                .catch(function(err){
                    return Promise.reject(err)
                })
}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData

    try {
        tokenData = jwt.verify(token, 'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }

    return User.findOne({
            _id: tokenData._id,
            'tokens.token': token // checking if the token matches
        })
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}