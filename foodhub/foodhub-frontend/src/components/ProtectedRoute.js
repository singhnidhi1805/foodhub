import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return auth.token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
