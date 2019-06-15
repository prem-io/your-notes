const { User } = require('../models/User')

// Express middleware - authenticateUser
const authenticateUser = function(req, res, next) {
    const token = req.header('x-auth')
    
    User.findByToken(token)
        .then(function(user){
            // res.send(user)
            if(user) {
                req.user = user // under the router there is no reference to 'user' object.
                req.token = token
                next()
            } else {
                res.status('401').send({ notice: 'token not available'})
            }
            
        })
        .catch(function(err){
            res.status('401').send(err)
        })
}

module.exports = {
    authenticateUser
}