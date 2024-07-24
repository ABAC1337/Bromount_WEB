const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    method:{
        type: String,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
    },
    totalAmountPrice: {
        type: Number,
        required: true
    },  
},{
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
