const express = require('express');
const { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, getRestaurantDashboard, search } = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createRestaurant)
    .get(getRestaurants);

router.route('/:id')
    .get(getRestaurantById)
    .put(protect, updateRestaurant);

router.route('/:id/dashboard')
    .get(protect, getRestaurantDashboard);

router.route('/search')
    .get(search);

module.exports = router;
