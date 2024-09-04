const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    cuisine: { type: String, required: true },
    menu: [{
        name: String,
        description: String,
        price: Number,
        image: String
    }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
