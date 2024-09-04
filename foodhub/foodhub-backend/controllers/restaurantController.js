const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant({
            ...req.body,
            owner: req.user.id,
        });
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        if (restaurant.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        Object.assign(restaurant, req.body);
        await restaurant.save();
        res.json(restaurant);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getRestaurantDashboard = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        // Ensure the user is the owner of the restaurant
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant || restaurant.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Fetch all orders related to this restaurant
        const orders = await Order.find({ restaurant: restaurantId });

        // Calculate total sales
        const totalSales = orders.reduce((total, order) => total + order.totalPrice, 0);

        // Prepare customer interaction summary
        const customerInteractions = orders.map(order => ({
            orderId: order._id,
            userId: order.user,
            items: order.items,
            totalPrice: order.totalPrice,
            status: order.status,
            date: order.createdAt
        }));

        res.json({
            totalOrders: orders.length,
            totalSales,
            customerInteractions
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.search = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            console.error('Query parameter is missing');
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        console.log('Received query:', query);

        // Search for restaurants by name or cuisine
        const restaurants = await Restaurant.find({
            $or: [
                { name: { $regex: new RegExp(query, 'i') } },
                { cuisine: { $regex: new RegExp(query, 'i') } }
            ]
        }).exec();
        console.log('Restaurants found:', restaurants);

        // Search for dishes in the menu
        const dishes = await Restaurant.find({
            'menu.name': { $regex: new RegExp(query, 'i') }
        }).exec();
        console.log('Dishes found:', dishes);

        res.json({ restaurants, dishes });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
