import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

// Create context
const AuthContext = createContext();

// Create provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role });
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export both the context and provider
export { AuthContext, AuthProvider };