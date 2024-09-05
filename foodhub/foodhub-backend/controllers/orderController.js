const Order = require('../models/Order');
const io = require('../server'); // Import the io instance


exports.createOrder = async (req, res) => {
    try {
        const order = new Order({
            ...req.body,
            user: req.user.id,
        });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('restaurant user');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status;
        await order.save();

        // Emit an event for real-time notification
        req.io.emit('orderUpdated', {
            orderId: order._id,
            status: order.status,
            userId: order.user,
            restaurantId: order.restaurant
        });

        res.json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
exports.getOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
