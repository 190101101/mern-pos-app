const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BillSchema = new Schema({
    customer: {
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Bill = mongoose.model('bills', BillSchema);
module.exports = Bill;

