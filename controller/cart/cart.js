const Cart = require("../../models/cartModel");

const addCart = async (req, res) => {
    const session = req.session.user;

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const { packageId, orderDate } = req.body;
        console.log(packageId, orderDate);
        const cart = await Cart.create({
            userId: session.user_id,
            packageId: packageId,
            orderDate: orderDate,
        })
        cart.save();
        res.redirect("/dashboard/user/cart");
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message }); 
    }
};

const deleteCart = async (req, res) => {
    const session = req.session.user;
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { cartId } = req.body;
    if (!cartId) {
        return res.status(400).json({ message: "Cart ID is required" });
    }

    try {
        const cart = await Cart.findOneAndDelete({ userId: session.user_id, _id: cartId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addCart,
    deleteCart
};

