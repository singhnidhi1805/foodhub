const Restaurant = require('../models/Restaurant');

exports. addMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        if (restaurant.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { name, description, price, image } = req.body;

        // Push new menu item to the restaurant's menu array
        restaurant.menu.push({ name, description, price, image });

        await restaurant.save();
        res.status(201).json(restaurant.menu);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        if (restaurant.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const menuItem = restaurant.menu.id(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        Object.assign(menuItem, req.body);
        await restaurant.save();
        res.json(menuItem);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        if (restaurant.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const menuItem = restaurant.menu.id(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        menuItem.remove();
        await restaurant.save();
        res.json({ message: 'Menu item removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
