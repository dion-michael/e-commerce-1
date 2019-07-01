const Transaction = require("../models/Transaction")
const Product = require("../models/Product")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class transactionController {

    static async getAll(req, res, next) {
        try {
            res.json(
                await Transaction.find({})
            )
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req, res, next) {
        try {
            res.json(await Transaction.find({
                buyer: req.loggedUser._id
            }))
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        let items = req.loggedUser.cart.map(item => {
            return {
                _id: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                image: item.productId.image,
                quantity: item.quantity,
                subtotal: item.subtotal
            }
        })
        let total = 0
        items.forEach(item => {
            total += item.subtotal
            Product.findById(item._id)
                .then(success => {
                    success.stock = success.stock - item.quantity
                    return success.save()
                })
                .then(saved => {
                    console.log(saved);
                })
                .catch(next)
        });
        let transaction = new Transaction({
            items,
            total,
            buyer: req.loggedUser._id,
            createdAt: new Date(),
            paymentDetails: req.body
        })
        try {
            req.loggedUser.cart = []
            await req.loggedUser.save()
            res.json(await transaction.save())
        } catch (error) {
            next(error)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            res.json(
                await Transaction.findByIdAndUpdate(req.params.transactionId, {
                    status: req.body.status
                }, {
                    new: true
                })
            )
        } catch (error) {
            next(error)
        }
    }

}

module.exports = transactionController