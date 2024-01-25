import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";
import jsonwebtoken from 'jsonwebtoken'

const handler = async (req, res) => {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let orders = await Order.find({email: data.email, status: "Paid"}).sort({createdAt: -1});
    res.status(200).json({ orders });
};

export default connectDb(handler);
