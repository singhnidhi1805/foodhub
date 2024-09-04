import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmOrderPayment } from '../../actions/orderActions';
import {
  Container,
  Typography,
  Button,
  Paper,
  makeStyles,
} from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 400,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  orderText: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(3),
    backgroundColor: '#ff5757', // Zomato red-like color
    color: '#fff',
    padding: theme.spacing(1.5),
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#e63946',
    },
  },
}));

const Payment = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const handlePayment = () => {
    // Simulate payment processing
    alert('Payment processing is not implemented.');
    
    // Dispatch action to confirm payment
    dispatch(confirmOrderPayment(orderId));
    
    // Redirect to order tracking page
    navigate(`/order-tracking/${orderId}`);
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" className={classes.heading} gutterBottom>
          Complete Your Payment
        </Typography>
        <Typography variant="body1" className={classes.orderText}>
          Order ID: {orderId}
        </Typography>
        <Button
          variant="contained"
          startIcon={<PaymentIcon />}
          className={classes.button}
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </Paper>
    </Container>
  );
};

export default Payment;
