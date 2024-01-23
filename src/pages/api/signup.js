import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body)

    const {name, email} = req.body;
    let user = new User({name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()});
    await user.save();
    
    res.status(200).json({ success: "success" });

  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
