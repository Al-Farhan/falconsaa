const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentInfo: {
        type: String,
        default: '',
    },
    products: {
        type: Object, 
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        default: "",
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Initiated",
        required: true,
    },
    deliveryStatus: {
        type: String,
        default: "unshipped",
        required: true,
    }
}, {timestamps: true});

mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
// export default mongoose.model.Order || mongoose.model("Order", OrderSchema);