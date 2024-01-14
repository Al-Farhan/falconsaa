const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    isbn: {
        type: Number,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required:true,
        enum: [
            "Medical", "Nursing", "Pharmacy", "Dental"
        ],
    },
    price: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    availableQty: {
        type: Number,
        required: true,
        default: 0,
    },
});

mongoose.models = {};
export default mongoose.model("Product", ProductSchema);

// export default mongoose.model.Product || mongoose.model("Product", ProductSchema);