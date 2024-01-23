import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  let order;
  // Validate pyatm checksum - pending

  // Update into the order table after checking the transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringy(req.body) }
    );
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringy(req.body) }
    );
  }

  // Intitate shipping
  // Redirect to the order confirmation page
  res.redirect("/order?id=" + order.id, 200);

  res.status(200).json({ body: req.body });
};

export default connectDb(handler);
