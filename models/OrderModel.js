const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    packageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Packages',
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    statusOrder:{
        type: String,
        enum: ['Pending', 'Success', 'History'],
        default: 'Pending',
        required: true
    },
    transactionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
    },
},{
    timestamps: true,   
}); 

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;