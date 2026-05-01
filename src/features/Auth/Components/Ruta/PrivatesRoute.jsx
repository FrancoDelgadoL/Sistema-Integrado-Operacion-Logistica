import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthComponente';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};