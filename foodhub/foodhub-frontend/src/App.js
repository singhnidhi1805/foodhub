import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import RestaurantPage from './pages/RestaurantPage';
import OrderPage from './pages/OrderPage';
import Profile from './pages/Profile';
import Payment from './components/Payment/Payment';
import OrderTracking from './components/Restaurant/OrderTracking';
import OrdersPage from './pages/OrderPage'; // Corrected import path
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <ProtectedRoute>
              <RestaurantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:orderId"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-tracking/:orderId"
          element={
            <ProtectedRoute>
              <OrderTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* Ensure there's a route for login if needed */}
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
