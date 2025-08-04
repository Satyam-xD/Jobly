import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    navigate('/login');               // Redirect to login
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p className="mb-6">You're successfully logged in 🎉</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
