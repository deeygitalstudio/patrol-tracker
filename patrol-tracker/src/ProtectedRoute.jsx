
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" />; // or any other path for unauthorized access
  }

  return children;
};

export default ProtectedRoute;

