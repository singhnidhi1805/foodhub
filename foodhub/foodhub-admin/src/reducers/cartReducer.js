import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cartActions';

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};
