import API from '../api';

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await API.post('/auth/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };
  
export const register = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await API.post('/auth/register', { name, email, password });
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.message });
  }
};
