import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import PaytmChecksum from "paytmchecksum";

const handler = async (req, res) => {
  let order;
  // Validate pyatm checksum - pending
  var paytmChecksum = "";
  var paytmParams = {}

  const received_data = req.body
  for(var key in received_data) {
    if(key == 'CHECKSUMHASH') {
    paytmChecksum = received_data[key];
    }
    else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
  if (!isValidChecksum) {
    res.status(500).send("Some error Occured");
    return
  }

  // Update into the order table after checking the transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID } //JSON.stringify(req.body)
    );
    let products = order.products;
    for(let item in products) {
      await Product.findOneAndUpdate({_id: item}, {$inc: {"availableQty": - products[item].qty}});
    }
    
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID }
    );
  }

  // Intitate shipping
  // Redirect to the order confirmation page
  res.redirect(`/order?clearCart=1&id=` + order._id, 200);

  // res.status(200).json({ body: req.body });
};

export default connectDb(handler);
