import API from '../api';

export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAIL = 'PLACE_ORDER_FAIL';
export const CONFIRM_ORDER_PAYMENT = 'CONFIRM_ORDER_PAYMENT';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

export const placeOrder = (orderData) => async (dispatch, getState) => {
    try {
        const { auth: { user } } = getState();
        
        const { data } = await API.post('/orders', orderData);
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: data });
        return data;
    } catch (error) {
        console.error('Error placing order:', error);
        dispatch({ type: PLACE_ORDER_FAIL, payload: error.response?.data?.message || 'Order failed' });
        throw error;
    }
};

export const confirmOrderPayment = (orderId) => async (dispatch) => {
    try {
        await API.put(`/orders/${orderId}/confirm-payment`);
        dispatch({ type: CONFIRM_ORDER_PAYMENT, payload: orderId });
    } catch (error) {
        console.error('Payment confirmation failed:', error.response?.data?.message || 'Payment confirmation failed');
    }
};

export const fetchOrders = () => async (dispatch) => {
    try {
        const { data } = await API.get('/orders');
        dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error fetching orders:', error);
        dispatch({ type: FETCH_ORDERS_FAIL, payload: error.response?.data?.message || 'Failed to fetch orders' });
    }
};
