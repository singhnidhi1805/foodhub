import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import AdminDashboard from './AdminDashboard';
import RestaurantManagement from './RestaurantManagement';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/restaurants"
          element={
            <ProtectedRoute>
              <RestaurantManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menu/:id"
          element={
            <ProtectedRoute>
              <MenuManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <OrderManagement />
            </ProtectedRoute>
          }
        />
          <Route path="/login" element={<AuthPage />} />
        
      </Routes>
      
    </div>
  );
}

export default App;
