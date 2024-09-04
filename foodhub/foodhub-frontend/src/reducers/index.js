import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  orders: orderReducer,
});
