import React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Chip,
} from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

const useStyles = makeStyles((theme) => ({
  listItem: {
    alignItems: 'flex-start',
  },
  orderDetails: {
    marginTop: theme.spacing(1),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const OrderItem = ({ order }) => {
  const classes = useStyles();

  const getPaymentStatus = (status) => {
    switch (status) {
      case 'confirmed':
        return <Chip label="Payment Confirmed" color="primary" icon={<CheckCircleIcon />} />;
      case 'pending':
        return <Chip label="Payment Pending" color="secondary" icon={<HourglassEmptyIcon />} />;
      default:
        return <Chip label="Unknown Status" />;
    }
  };

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={`Order ID: ${order._id}`}
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              Restaurant: {order.restaurant.name}
            </Typography>
            <div className={classes.orderDetails}>
              {order.items.map((item, index) => (
                <Typography key={index} variant="body2">
                  - {item.name} x {item.quantity} = ${parseFloat(item.price * item.quantity).toFixed(2)}
                </Typography>
              ))}
            </div>
            <Typography variant="body2" className={classes.orderDetails}>
              Total Price: ${parseFloat(order.totalPrice).toFixed(2)}
            </Typography>
            <div className={classes.chip}>
              {getPaymentStatus(order.paymentConfirmed ? 'confirmed' : 'pending')}
            </div>
          </>
        }
      />
    </ListItem>
  );
};

export default OrderItem;
