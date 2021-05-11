const Order = require("../models/orderModel");
const Products = require("../models/productsModel");
const User = require("../models/userModel");

const orderCtrl = {
  createOrder: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const { cart, address, phone, district, price, trxid } = req.body;
      if (!address || !phone || !district || !price) {
        return res.status(400).json({ msg: "Invalid Credendial" });
      }
      const { _id, name, email } = user;
      const newOrder = new Order({
        user_id: _id,
        name,
        email,
        cart,
        district,
        address,
        phone,
        price,
        trxid,
      });
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newOrder.save();
      res.json({ msg: "Order Succes!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  orderList: async (req, res) => {
    try {
      const orderList = await Order.find();
      res.json(orderList);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = orderCtrl;
