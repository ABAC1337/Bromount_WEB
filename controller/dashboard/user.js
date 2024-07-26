const Packages = require("../../models/packagesModel");
const Cart = require("../../models/cartModel");
const Order = require("../../models/OrderModel");
const Transaction = require("../../models/transactionModel");
const userDashboardPage = async (req, res) => {
  const session = req.session.user;
  const username = session ? session.username : null;

  if (!username) {
    return res.redirect('/login');
  }

  try {
    const SuccessOrder = await Order.find({ userId: session.user_id, statusOrder: 'Success' }).populate(["packageId", "userId"]);
    SuccessOrder.forEach(order => {
      console.log(order._id);
    });

    const invoicePromises = SuccessOrder.map(order =>
      Transaction.find({ orderId: order._id }).populate(["orderId"])
    );

    const invoices = await Promise.all(invoicePromises);
    const invoice = invoices.flat();
    res.render("dashboard-user-home", {
      name: username,
      SuccessOrder,
      invoice
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const CartPage = async (req, res) => {
  try {
    const session = req.session.user;
    const cart = await Cart.find({ userId: session.user_id }).populate(["packageId", "userId"]);
    res.render("dashboard-user-cart", {
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const PackagesPage = async (req, res) => {
  try {
    const Malangdb = await Packages.find({ via: 'Malang' })
    const Pasuruandb = await Packages.find({ via: 'Pasuruan' })
    const Probolinggodb = await Packages.find({ via: 'Probolinggo' })
    const Lumajangdb = await Packages.find({ via: 'Lumajang' })

    res.render("dashboard-user-packages", {
      Malang: Malangdb,
      Pasuruan: Pasuruandb,
      Probolinggo: Probolinggodb,
      Lumajang: Lumajangdb
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const PaymentPage = async (req, res) => {
  try {
    const session = req.session.user;
    const orderDb = await Order.find({ userId: session.user_id, statusOrder: 'Pending' }).populate(["packageId", "userId"]);
    res.render("dashboard-user-payment", {
      order: orderDb
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = { userDashboardPage, CartPage, PackagesPage, PaymentPage };

//