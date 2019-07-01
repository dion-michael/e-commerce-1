const mongoose = require('mongoose')
const User = require('./User')
const Schema = mongoose.Schema
const URLSlugs = require('mongoose-url-slugs')
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    tags: Array,
    image: String
})
productSchema.plugin(URLSlugs('name', {
    field: 'slug'
}))

productSchema.post('findOneAndDelete', function (deleted, next) {
    User.updateMany({}, {
        $pull: {
            'cart': {
                'productId': {
                    $in: deleted._id
                }
            }
        }
    }).then(success => {
        next()
    }).catch(next)
})
const Product = mongoose.model('Product', productSchema)

module.exports = Product