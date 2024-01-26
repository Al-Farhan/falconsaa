import Product from "../../../models/Product"
import connectDb from "../../../middleware/mongoose"

const handler = async (req, res) => {

    if(req.method != 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {query} = req.query;

    try {
        const results = await Product.find({
            $or: [
              { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in the title
              { desc: { $regex: query, $options: 'i' } }, // Case-insensitive search in the content
            ],
          });
      
          res.status(200).json(results);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

export default connectDb(handler);