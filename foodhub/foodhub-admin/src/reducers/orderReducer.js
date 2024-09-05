import {
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    CONFIRM_ORDER_PAYMENT,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
} from '../actions/orderActions';

const initialState = {
    orders: [],
    currentOrder: null,
    error: null,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                currentOrder: action.payload,
                orders: [...state.orders, action.payload], // Add new order to the list
            };
        case PLACE_ORDER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CONFIRM_ORDER_PAYMENT:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload ? { ...order, status: 'Paid' } : order
                ),
            };
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
            };
        case FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
