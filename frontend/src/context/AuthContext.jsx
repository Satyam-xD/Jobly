import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Correct named import

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const decoded = jwtDecode(token);
        
        // Check token expiration (exp is in seconds)
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setCurrentUser(JSON.parse(user));
        }
      } catch (err) {
        console.error('Token decoding error:', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);

    // Set auto-logout timer
    const decoded = jwtDecode(token);
    const expiresIn = decoded.exp * 1000 - Date.now();
    setTimeout(logout, expiresIn);
  };

  const value = {
    currentUser,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}