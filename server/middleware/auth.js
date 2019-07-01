const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Transaction = require('../models/Transaction')

function Authenticate(req, res, next) {
    try {
        if (req.headers.hasOwnProperty('token')) {
            const decode = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            User.findById(decode.id).populate('cart.productId')
                .then(user => {
                    req.loggedUser = user
                    console.log(user, 'dari auth');
                    next()
                }).catch(next)

        } else {
            throw ({
                code: 401,
                message: "you have to login first"
            })
        }
    } catch (error) {
        next(error)
    }
}

async function Authorize(req, res, next) {
    try {
        let result = await Transaction.findById(req.params.transactionId)
        if (result) {
            console.log(result.buyer, 'buyer');
            console.log(req.loggedUser._id, 'logged user');
            if (result.buyer == req.loggedUser._id.toString()) {
                next()
            } else {
                console.log('masuk sini');
                throw ({
                    code: 401,
                    message: "not authorized"
                })
            }
        } else {
            next({
                code: 404,
                message: "transaction not found"
            })
        }
    } catch (error) {
        next(error)
    }
}

async function AdminOnly(req, res, next) {
    console.log(req.loggedUser.role);
    if (req.loggedUser.role === "ADMIN") {
        next()
    } else {
        next({
            code: 401,
            message: "NOT AUTHORIZED"
        })
    }
}

module.exports = {
    Authenticate,
    Authorize,
    AdminOnly
}