import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import {
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: 600,
  },
  status: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  button: {
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    padding: theme.spacing(1.5, 3),
    borderRadius: '30px',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
}));

const OrderTracking = () => {
  const classes = useStyles();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${orderId}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order');
        setShowError(true);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <Container className={classes.container}>
      <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
        {/* <Alert severity="error" onClose={() => setShowError(false)}>
          {error}
        </Alert> */}
      </Snackbar>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Order Tracking
        </Typography>
        <Typography variant="h6">Order ID: {order._id}</Typography>
        <Typography variant="h5" className={classes.status}>
          Status: {order.status}
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => navigate('/home')}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderTracking;
