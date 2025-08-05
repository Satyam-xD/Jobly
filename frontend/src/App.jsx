import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';
import PrivateRoute from './components/PrivateRoute';

function ErrorFallback({ error }) {
  return (
    <div role="alert" className="p-4 text-red-600">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    const pageTitles = {
      '/': 'Home | Jobly',
      '/register': 'Register | Jobly',
      '/login': 'Login | Jobly',
      '/jobs': 'Jobs | Jobly',
      '/dashboard': 'Dashboard | Jobly',
      '/post-job': 'Post Job | Jobly',
      '/applications': 'Applications | Jobly'
    };
    document.title = pageTitles[location.pathname] || 'Jobly';

    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Simulate loading (remove in production)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/applications" element={<Applications />} />
          </Route>
          
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </ErrorBoundary>
  );
};

export default App;