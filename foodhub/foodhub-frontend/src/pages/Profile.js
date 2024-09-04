import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, makeStyles } from '@material-ui/core';
import OrdersList from '../pages/OrdersList';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  // Assuming user.orders is an array of order objects
  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>

      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6">Profile Information</Typography>
        <Typography variant="body1">Name: {user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
      </Paper>

      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          My Orders
        </Typography>
        <OrdersList orders={user.orders || []} /> {/* Ensure orders is passed correctly */}
      </Paper>
    </Container>
  );
};

export default Profile;
