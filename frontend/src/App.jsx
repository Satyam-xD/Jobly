//App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Logout from './pages/Logout';
import SavedJobs from './pages/SavedJobs';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/post-job" element={
          <PrivateRoute><PostJob /></PrivateRoute>
        } />
        <Route path="/applications" element={
          <PrivateRoute><Applications /></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        } />
        <Route path="/messages" element={
          <PrivateRoute><Messages /></PrivateRoute>
        } />
        <Route path="/saved-jobs" element={
          <PrivateRoute><SavedJobs /></PrivateRoute>
        } />
      </Routes>
    </>
  );
};

export default App;