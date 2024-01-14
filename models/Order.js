const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: trusted,
    },
    products: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }],
    address: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
        required: true,
    }
});

// mongoose.models = {};
// export default mongoose.model("Order", OrderSchema);
export default mongoose.model.Order || mongoose.model("Order", OrderSchema);