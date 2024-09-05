import React from 'react';
import { Container, Grid, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../src/actions/authActions'; 

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Logout Button */}
      <Button
        className={classes.logoutButton}
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Manage Restaurants</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/restaurants')}>
              Go
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Manage Orders</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/orders')}>
              Go
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
