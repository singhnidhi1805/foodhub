import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../actions/cartActions';
import { placeOrder } from '../../actions/orderActions';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Paper,
  Divider,
  makeStyles,
  Snackbar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    boxShadow: theme.shadows[5],
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
  },
  listItem: {
    backgroundColor: '#fafafa',
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    '&:hover': {
      boxShadow: theme.shadows[6],
    },
  },
  total: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  emptyCart: {
    textAlign: 'center',
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#ff4d4f',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#ff7875',
    },
  },
  cartHeader: {
    display: 'flex',
    alignItems: 'center',
    color: '#ff4d4f',
    marginBottom: theme.spacing(2),
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbar: {
    backgroundColor: '#52c41a',
  },
}));

const Cart = ({ onOrderPlaced }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        restaurant: cartItems[0].restaurantId,
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: cartItems.reduce((acc, item) => {
          const price = parseFloat(item.price) || 0;
          const quantity = parseInt(item.quantity, 10) || 0;
          return acc + price * quantity;
        }, 0),
      };

      const order = await dispatch(placeOrder(orderData));
      dispatch(clearCart());
      onOrderPlaced(order);

      setShowSnackbar(true);

      setTimeout(() => {
        navigate(`/payment/${order._id}`);
      }, 1000);
    } catch (error) {
      console.error('Order placement failed:', error);
      setError('Order placement failed. Please try again.');
    }
  };

  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;  // Ensure price is a number
    const quantity = parseInt(item.quantity, 10) || 0;  // Ensure quantity is a number
    return acc + (price * quantity);
  }, 0);
  
  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.cartHeader}>
          <ShoppingCartIcon />
          <Typography variant="h4" style={{ marginLeft: '10px' }}>
            Your Cart
          </Typography>
        </div>
        {cartItems.length === 0 ? (
          <Typography variant="body1" className={classes.emptyCart}>
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <motion.div key={item._id} whileHover={{ scale: 1.03 }}>
                  <ListItem className={classes.listItem}>
                    <ListItemText
                      primary={`${item.name} - ${item.quantity} x $${parseFloat(item.price).toFixed(2)}`}
                      secondary={`Total: $${(parseFloat(item.price) * item.quantity).toFixed(2)}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </motion.div>
              ))}
            </List>
            <Divider />
            <Typography variant="h5" className={classes.total}>
              Total: ${total.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              fullWidth
              className={classes.button}
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
            >
              Place Order
            </Button>
          </>
        )}
      </Paper>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <div className={classes.snackbar}>{error}</div>
        </Snackbar>
      )}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="Order placed successfully!"
        ContentProps={{ className: classes.snackbar }}
      />
    </Container>
  );
};

export default Cart;
