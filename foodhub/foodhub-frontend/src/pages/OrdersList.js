import React from 'react';
import { Typography, List, ListItem, Card, CardContent, makeStyles, Grow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  orderDetails: {
    marginTop: theme.spacing(2),
  },
  orderId: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  status: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
    color: theme.palette.secondary.main,
  },
  price: {
    marginTop: theme.spacing(1),
    fontWeight: 700,
    color: '#4caf50', // Green for total price
  },
  itemDetails: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const OrdersList = ({ orders = [] }) => {
  const classes = useStyles();

  if (!orders.length) {
    return <Typography variant="body1" color="textSecondary">No orders found.</Typography>;
  }

  return (
    <List className={classes.list}>
      {orders.map((order) => (
        <Grow in key={order._id} timeout={500}>
          <ListItem>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" className={classes.orderId}>Order ID: {order._id}</Typography>
                <Typography variant="body2" className={classes.status}>Status: {order.status}</Typography>
                <Typography variant="body2" className={classes.price}>Total Price: ${order.totalPrice.toFixed(2)}</Typography>
                <div className={classes.orderDetails}>
                  {order.items.map((item) => (
                    <Typography key={item._id} variant="body2" className={classes.itemDetails}>
                      - {item.name} (Quantity: {item.quantity}, Price: ${item.price.toFixed(2)})
                    </Typography>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ListItem>
        </Grow>
      ))}
    </List>
  );
};

export default OrdersList;
