const express = require('express');
const { createOrder, getOrderById, updateOrderStatus, getOrderHistory } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, getOrderHistory);

router.route('/:id')
    .get(protect, getOrderById)
    .put(protect, updateOrderStatus);

module.exports = router;
