import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Jobly</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/jobs" className="hover:underline">Jobs</Link>

        {!user && (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/post-job" className="hover:underline">Post Job</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={logout} className="ml-2 underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
