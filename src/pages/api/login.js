import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ "email": req.body.email });
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      "secret123d"
    );
    let decryptedData = (bytes.toString(CryptoJS.enc.Utf8));

    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedData) {
        let token = jwt.sign({ email: user.email, name: user.name }, 'jwtsecret', {expiresIn: "2d"});
        res.status(200).json({success: true, token});
      } else {
        res.status(200).json({ success: false, error: "Invalid credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
