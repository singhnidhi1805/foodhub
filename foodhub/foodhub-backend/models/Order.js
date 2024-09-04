const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            name: String,
            quantity: Number,
            price: Number,
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
