const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "email cannot be empty"],
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
            },
            message: data => `${data.value} is not a valid email`
        },
        validate: {
            validator: async function () {
                let isUsed = await User.findOne({
                    email: this.email,
                    _id: {
                        $ne: this._id
                    }
                })
                if (isUsed) {
                    return false
                } else {
                    return true
                }
            },
            message: data => `${data.value} is already in use`
        }
    },
    password: String,
    username: String,
    picture: String,
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    cart: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: Number,
        subtotal: Number
    }]
})

userSchema.pre('save', async function (next) {
    let user = await User.findById(this._id)
    if (user) {
        next()
    } else {
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User