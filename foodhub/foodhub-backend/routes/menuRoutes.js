const express = require('express');
const { addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:restaurantId')
    .post(protect, addMenuItem);

router.route('/:restaurantId/:menuItemId')
    .put(protect, updateMenuItem)
    .delete(protect, deleteMenuItem);

module.exports = router;
