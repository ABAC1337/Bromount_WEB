const express = require('express')
const controller = require('../../controller/dashboard/user')
const {addCart, deleteCart} = require('../../controller/cart/cart')
const {createOrder, deleteOrder, cartToOrder} = require('../../controller/order/order')
const {createTransaction} = require('../../controller/transaction/transaction')

const router = express.Router()

router.get("/", controller.userDashboardPage);
router.get("/cart", controller.CartPage);
router.get("/packages", controller.PackagesPage);
router.get("/payment", controller.PaymentPage);
router.post("/add-cart", addCart);
router.post("/delete-cart", deleteCart);
router.post("/add-order", createOrder);
router.post("/delete-order", deleteOrder);
router.post("/cart-to-order", cartToOrder);
router.post("/create-transaction", createTransaction);

module.exports = { userRoute : router }