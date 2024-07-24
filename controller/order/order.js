const Order = require('../../models/OrderModel');
const Cart = require('../../models/cartModel');

const cartToOrder = async (req, res) => {
    const session = req.session.user;
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { cartId } = req.body;
    console.log(cartId);
    try {
        const cart = await Cart.findOne({ _id: cartId });
        const order = await Order.create({
            userId: session.user_id,
            packageId: cart.packageId,
            orderDate: cart.orderDate,
            statusOrder: 'Pending'
        });
        await Cart.findByIdAndDelete(cartId);
        await order.save();
        console.log(order);
        console.log(cart);
        res.redirect('/dashboard/user/payment');
    } catch (error) {
        console.log(error);
    }
}
const createOrder = async (req, res) => {
    const session = req.session.user;
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { packageId, orderDate } = req.body;
    try {
        const order = await Order.create({
            userId: session.user_id,
            packageId: packageId,
            orderDate: orderDate,
            statusOrder: 'Pending'
        });
        await order.save();
        res.redirect('/dashboard/user/payment');
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    const session = req.session.user;
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { orderId } = req.body;
    try {
        const order = await Order.findByIdAndDelete(orderId);
        res.redirect('/dashboard/user/payment');
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


module.exports = { createOrder, deleteOrder, cartToOrder };