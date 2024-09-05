import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Paper, Button, Card, CardContent, 
  CardActionArea, AppBar, Toolbar, IconButton, Avatar, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon, ShoppingCart as CartIcon, Person as PersonIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/authActions';
import API from '../api';

import SearchBar from '../components/Restaurant/SearchBar';
import RestaurantList from '../components/Restaurant/RestaurantList';
import Cart from '../components/Cart/Cart';
import OrderTracking from '../components/Restaurant/OrderTracking';
import OrdersList from '../pages/OrdersList';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
}));

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderPlacement = (order) => {
    setCurrentOrderId(order._id);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Foodie Hub
          </Typography>
          <IconButton color="inherit" component={Link} to="/orders">
            <CartIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/profile">
            <PersonIcon />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </StyledAppBar>

      <StyledContainer maxWidth="lg">
        <StyledCard>
          <CardContent>
            <SearchBar setSearchResults={setSearchResults} />
          </CardContent>
        </StyledCard>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Restaurants Near You
                </Typography>
                <RestaurantList restaurants={searchResults.length ? searchResults : []} />
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Your Cart
                </Typography>
                <Cart onOrderPlaced={handleOrderPlacement} />
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {currentOrderId && (
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Track Your Order
              </Typography>
              <OrderTracking orderId={currentOrderId} />
            </CardContent>
          </StyledCard>
        )}

        <StyledCard>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Your Orders
            </Typography>
            <OrdersList orders={orders} />
          </CardContent>
        </StyledCard>
      </StyledContainer>
    </>
  );
};

export default Home;