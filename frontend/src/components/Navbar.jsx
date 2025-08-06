// src/components/Navbar.jsx


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/jobs" className="hover:text-gray-300">Jobs</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              {currentUser.role === 'employer' && (
                <Link to="/post-job" className="hover:text-gray-300">Post Job</Link>
              )}
              {currentUser.role === 'jobseeker' && (
                <Link to="/applications" className="hover:text-gray-300">My Applications</Link>
              )}
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Logout
              </button>
              <span className="text-sm">
                {currentUser.name} ({currentUser.role})
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;