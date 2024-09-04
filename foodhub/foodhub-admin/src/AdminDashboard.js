import React from 'react';
import { Container, Grid, Paper, Typography, Button, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Manage Restaurants</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/restaurants')}>
              Go
            </Button>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Manage Menu</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/menu')}>
              Go
            </Button>
          </Paper>
        </Grid> */}
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
