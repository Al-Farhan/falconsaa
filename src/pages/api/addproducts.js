import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body)
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        isbn: req.body[i].isbn,
        category: req.body[i].category,
        price: req.body[i].price,
        mrp: req.body[i].mrp,
        availableQty: req.body[i].availableQty,
      });
      await p.save();
    }
    res.status(200).json({ success: "success" });

  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
