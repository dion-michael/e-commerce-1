const mongoose = require('mongoose')
const Schema = mongoose.Schema
const transactionSchema = new Schema({
    items: Array,
    total: Number,
    status: {
        type: String,
        enum: ['WAITING_FOR_PAYMENT', 'ON_PROCESS', 'ON_DELIVERY', 'DELIVERED'],
        default: 'WAITING_FOR_PAYMENT'
    },
    payment: ["VISA", "MASTERCARD", "BANK_TRANSFER"],
    paymentDetails: Object,
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Date
})
const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction