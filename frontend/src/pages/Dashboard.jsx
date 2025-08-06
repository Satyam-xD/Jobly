//src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    jobsPosted: 0,
    applicationsReceived: 0,
    applicationsSent: 0,
    savedJobs: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (currentUser.role === 'employer') {
          const res = await axios.get('http://localhost:5000/api/jobs/employer-jobs', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStats(prev => ({ ...prev, jobsPosted: res.data.length }));
        } else {
          const res = await axios.get('http://localhost:5000/api/applications/my-applications', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStats(prev => ({ ...prev, applicationsSent: res.data.length }));
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, [currentUser]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{currentUser.name}'s Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentUser.role === 'employer' ? (
          <>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold">Jobs Posted</h3>
              <p className="text-3xl font-bold">{stats.jobsPosted}</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold">Applications Received</h3>
              <p className="text-3xl font-bold">{stats.applicationsReceived}</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold">Applications Sent</h3>
              <p className="text-3xl font-bold">{stats.applicationsSent}</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold">Saved Jobs</h3>
              <p className="text-3xl font-bold">{stats.savedJobs}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;