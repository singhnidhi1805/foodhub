import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../actions/orderActions';
import {
  Container,
  Typography,
  Grid,
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import OrderItem from '../pages/OrderItem';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(3),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
}));

const OrdersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <Container className={classes.container}>
      <Typography variant="h3" className={classes.header}>
        Your Orders
      </Typography>

      {error && (
        <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
          {/* <Alert severity="error" onClose={() => setShowError(false)}>
            {error}
          </Alert> */}
        </Snackbar>
      )}

      {orders.length === 0 ? (
        <Typography variant="h6" align="center">
          You have no orders yet.
        </Typography>
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <List className={classes.list}>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <OrderItem order={order} />
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default OrdersPage;
