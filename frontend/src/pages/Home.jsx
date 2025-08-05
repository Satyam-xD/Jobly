import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="text-center mt-10">
    <h1 className="text-4xl font-bold mb-4">Welcome to Jobly</h1>
    <p className="text-xl text-gray-600 mb-8">Your Freelance Job Platform</p>
    
    <div className="flex justify-center space-x-4">
      <Link 
        to="/jobs" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Browse Jobs
      </Link>
      
      <Link 
        to="/register" 
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  </div>
);

export default Home;