import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import API from '../../api';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#fff',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: theme.shape.borderRadius,
  },
  media: {
    height: 180,
    borderRadius: theme.shape.borderRadius,
    backgroundSize: 'cover',
  },
  content: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  restaurantName: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    color: theme.palette.error.main,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
}));

const RestaurantList = () => {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await API.get('/restaurants');
        setRestaurants(data);
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.error}>
        <ErrorOutlineIcon fontSize="large" />
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Discover Restaurants
      </Typography>
      <Grid container spacing={4}>
        {restaurants.map((restaurant) => (
          <Grid item key={restaurant._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea
                component={RouterLink}
                to={`/restaurants/${restaurant._id}`}
                className={classes.link}
              >
                <CardMedia
                  className={classes.media}
                  image={restaurant.image || 'default-restaurant.jpg'}
                  title={restaurant.name}
                />
                <CardContent className={classes.content}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    className={classes.restaurantName}
                  >
                    {restaurant.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.iconText}
                  >
                    <RestaurantIcon fontSize="small" /> {restaurant.cuisine}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.iconText}
                  >
                    <LocationOnIcon fontSize="small" /> {restaurant.address}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RestaurantList;
