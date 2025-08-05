// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, children }) {
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;