import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  IconButton,
  TextField,
  makeStyles,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(3),
    backgroundColor: '#fafafa',
    minHeight: '100vh',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
    },
  },
  media: {
    height: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(10),
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(10),
    color: theme.palette.error.main,
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  quantityButton: {
    padding: theme.spacing(1),
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
  },
  itemPrice: {
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    color: theme.palette.text.primary,
  },
}));

const RestaurantPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await API.get(`/restaurants/${id}`);
        setMenu(data.menu);
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(1, quantity),
    }));
  };

  const handleIncrement = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 1) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 1) - 1;
      return {
        ...prevQuantities,
        [itemId]: Math.max(1, newQuantity),
      };
    });
  };

  const handleAddToOrder = (item) => {
    const quantity = quantities[item._id] || 1;
    dispatch(addToCart({ ...item, quantity }));
    setShowSnackbar(true);
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

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
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.header}>
        Menu
      </Typography>
      <Grid container spacing={4}>
        {menu.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={item.image || 'default-dish.jpg'}
                title={item.name}
              />
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h6" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" className={classes.itemPrice}>
                  ${item.price.toFixed(2)}
                </Typography>
                <div className={classes.quantityControl}>
                  <IconButton
                    className={classes.quantityButton}
                    onClick={() => handleDecrement(item._id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    className={classes.quantityInput}
                    type="number"
                    value={quantities[item._id] || 1}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                    inputProps={{ min: 1 }}
                    variant="outlined"
                  />
                  <IconButton
                    className={classes.quantityButton}
                    onClick={() => handleIncrement(item._id)}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </CardContent>
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                fullWidth
                className={classes.button}
                onClick={() => handleAddToOrder(item)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Item added to cart"
      />
    </Container>
  );
};

export default RestaurantPage;
