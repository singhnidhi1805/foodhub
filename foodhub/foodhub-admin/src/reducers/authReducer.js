const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          token: action.payload.token,
          loading: false,
        };
      case 'LOGIN_FAIL':
      case 'REGISTER_FAIL':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          token: null,
        };
      default:
        return state;
    }
  };