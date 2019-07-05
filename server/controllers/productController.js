const Product = require("../models/Product")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class productController {

    static async getAll(req, res, next) {
        try {
            res.json(await Product.find({}))
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req, res, next) {
        try {
            let product = await Product.findById(req.params.id)
            res.json(product)
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        let {
            name,
            description,
            price,
            stock,
            tags,
            image
        } = req.body
        let newProduct = new Product({
            name,
            description,
            price,
            stock,
            tags,
            image
        })
        try {
            res.status(201).json(await newProduct.save())
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            console.log(req.body);
            console.log(req.params.productId);
            let update = await Product.findByIdAndUpdate(req.params.productId, {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    section: req.body.section,
                    image: req.body.image
                }
            }, {
                new: true
            })
            console.log(update, '========== 55 ===========');
            res.json(update)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            console.log('masuk');
            console.log(req.params.productId);
            res.json(await Product.findByIdAndDelete(req.params.productId))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = productController