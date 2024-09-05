import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  TextField,
  makeStyles,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[10],
    },
  },
  media: {
    height: 160,
  },
  content: {
    flexGrow: 1,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
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
    width: 60,
    textAlign: 'center',
  },
}));

const RestaurantMenu = () => {
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
      [itemId]: Math.max(1, quantity), // Ensure quantity is at least 1
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
        [itemId]: Math.max(1, newQuantity), // Ensure quantity is at least 1
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
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>
      <Grid container spacing={4}>
        {menu.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
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
                  <Typography variant="h6" color="textPrimary">
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
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="Item added to cart"
      />
    </Container>
  );
};

export default RestaurantMenu;
