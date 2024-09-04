import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, makeStyles, Button } from '@material-ui/core';
import API from './api';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
}));

const OrderManagement = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await API.get('/orders');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}`, { status });
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Order #{order._id}</Typography>
              <Typography variant="body1">Status: {order.status}</Typography>
              <Typography variant="body1">Total: ${order.totalPrice.toFixed(2)}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdateStatus(order._id, 'Completed')}
                style={{ marginTop: '10px' }}
              >
                Mark as Completed
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrderManagement;
