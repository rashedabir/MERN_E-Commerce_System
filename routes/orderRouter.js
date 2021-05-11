const router = require("express").Router();
const orderCtrl = require("../controllers/orderCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/order")
  .post(auth, orderCtrl.createOrder)
  .get(auth, authAdmin, orderCtrl.orderList);

module.exports = router;
