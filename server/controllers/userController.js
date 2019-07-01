const User = require("../models/User")
const Product = require("../models/Product")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {

    static getAll(req, res, next) {
        let userData = {
            username: req.loggedUser.username,
            email: req.loggedUser.email,
            picture: req.loggedUser.picture,
            role: req.loggedUser.role,
            cart: req.loggedUser.cart,
            _id: req.loggedUser._id
        }
        res.json(userData)
    }

    static async register(req, res, next) {
        let newUser = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            picture: req.body.picture,
            cart: [],
            cartTotal: 0,
        })
        console.log(newUser);
        try {
            res.json(await newUser.save())
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let user = await User.findOne({
                email: req.body.email
            })
            if (user) {
                let isValid = bcrypt.compareSync(req.body.password, user.password)
                if (isValid) {
                    let token = jwt.sign({
                        username: user.username,
                        email: user.email,
                        id: user._id
                    }, process.env.JWT_SECRET)
                    res.json({
                        token,
                        email: user.email,
                        id: user._id
                    })
                } else {
                    throw ({
                        code: 401,
                        message: "wrong email/password"
                    })
                }
            } else {
                throw ({
                    code: 404,
                    message: "wrong email/password"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async addCart(req, res, next) {
        let user = req.loggedUser
        console.log(user);
        try {
            let product = await Product.findById(req.params.productId)
            if (product) {
                let index = user.cart.map(item => {
                    return item.productId._id
                }).indexOf(product._id)
                if (index >= 0) {
                    console.log('ada di cart');
                    user.cart[index].quantity++
                    user.cart[index].subtotal = product.price * user.cart[index].quantity
                } else {
                    user.cart.push({
                        productId: product._id,
                        quantity: 1,
                        subtotal: product.price
                    })
                }
                User.populate(user, {
                    path: 'cart.productId',
                    model: 'Product'
                })
                res.json(await user.save())
            } else {
                throw {
                    code: 404,
                    message: "product not found"
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async removeCart(req, res, next) {
        let user = req.loggedUser
        User.update({
            _id: user._id
        }, {
            $pull: {
                'cart': {
                    'productId': {
                        $in: req.params.productId
                    }
                }
            }
        }).then(success => {
            res.json(success)
        }).catch(next)
    }

    static async removeItem(req, res, next) {
        if (req.loggedUser.cart.length === 0) {
            console.log('masuk');
            next({
                code: 404,
                message: "cart have no items"
            })
        }
        let index = req.loggedUser.cart.map(item => {
            return item.productId._id
        }).indexOf(req.params.productId)
        if (req.loggedUser.cart[index].quantity > 1) {
            req.loggedUser.cart[index].quantity--
            req.loggedUser.cart[index].subtotal = req.loggedUser.cart[index].productId.price * req.loggedUser.cart[index].quantity
        } else {
            req.loggedUser.cart.splice(index, 1)
        }
        try {
            res.json(await req.loggedUser.save())
        } catch (error) {
            next(error)
        }
    }

    static async cartDetail(req, res, next) {
        let items = req.loggedUser.cart.map(item => {
            return {
                _id: item.productId._id,
                slug: item.productId.slug,
                name: item.productId.name,
                description: item.productId.description,
                price: item.productId.price,
                image: item.productId.image,
                quantity: item.quantity,
                subtotal: item.subtotal
            }
        })
        let total = 0
        items.forEach(item => {
            total += item.subtotal
        })
        res.json({
            userId: req.loggedUser._id,
            items,
            total
        })
    }

}

module.exports = userController