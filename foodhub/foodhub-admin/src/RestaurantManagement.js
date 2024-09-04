import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, TextField, Grid, makeStyles } from '@material-ui/core';
import API from './api';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
}));

const RestaurantManagement = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cuisine, setCuisine] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data } = await API.get('/restaurants');
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  const handleCreateRestaurant = async () => {
    try {
      await API.post('/restaurants', { name, address, cuisine });
      setName('');
      setAddress('');
      setCuisine('');
    } catch (error) {
      console.error('Failed to create restaurant', error);
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/admin/menu/${restaurantId}`);
  };
  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Manage Restaurants
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h6">Create a New Restaurant</Typography>
        <form noValidate autoComplete="off">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Cuisine"
            fullWidth
            margin="normal"
            variant="outlined"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateRestaurant}
            style={{ marginTop: '20px' }}
          >
            Create Restaurant
          </Button>
        </form>
      </Paper>
      <Grid container spacing={3}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
            <Paper className={classes.paper} onClick={() => handleRestaurantClick(restaurant._id)}>
              <Typography variant="h6">{restaurant.name}</Typography>
              <Typography variant="body1">{restaurant.address}</Typography>
              <Typography variant="body2">{restaurant.cuisine}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RestaurantManagement;
