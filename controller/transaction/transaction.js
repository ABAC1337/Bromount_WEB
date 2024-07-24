const Transaction = require("../../models/transactionModel");
const Order = require("../../models/OrderModel");

const createTransaction = async (req, res) => {
    const { orderId, totalPrice, methodPayment } = req.body;
    console.log(orderId, totalPrice, methodPayment);
    try {
        const transaction = await Transaction.create({
            orderId,
            method: methodPayment,
            totalAmountPrice: totalPrice,
            transactionDate: Date.now(),
        });
        transaction.save();
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            {
                statusOrder: "Success",
                transactionId: transaction._id
            },
            { new: true }
        );
        updatedOrder.save();
        res.redirect("/dashboard/user");
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { createTransaction }