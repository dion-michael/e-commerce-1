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
            res.json(await Product.findOneAndUpdate(req.params.id, req.body, {
                new: true
            }))
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            console.log('masuk');
            res.json(await Product.findByIdAndDelete(req.params.productId))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = productController