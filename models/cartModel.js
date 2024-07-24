const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
},{
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;