import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    if (roles && !roles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" />;
    }
    return <Outlet />;
  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;