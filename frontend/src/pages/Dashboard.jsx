import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        let data = {};

        if (currentUser.role === 'client') {
          const jobsRes = await axios.get('http://localhost:5000/api/jobs/user', config);
          data.jobs = jobsRes.data.jobs;
        } else {
          const appsRes = await axios.get('http://localhost:5000/api/applications', config);
          data.applications = appsRes.data.applications;
        }

        setDashboardData(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {currentUser?.name}!
      </h1>
      
      {currentUser?.role === 'client' ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Posted Jobs</h2>
            <a 
              href="/post-job" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post New Job
            </a>
          </div>
          
          {dashboardData?.jobs?.length === 0 ? (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>You haven't posted any jobs yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dashboardData?.jobs?.map(job => (
                <div key={job._id} className="border p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600 mt-2">{job.description.substring(0, 100)}...</p>
                  <p className="mt-2"><strong>Budget:</strong> ${job.budget}</p>
                  <p><strong>Status:</strong> {job.status}</p>
                  {job.assignedFreelancer && (
                    <p><strong>Freelancer:</strong> {job.assignedFreelancer.name}</p>
                  )}
                  <a 
                    href={`/jobs/${job._id}`} 
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View Details
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Applications</h2>
          {dashboardData?.applications?.length === 0 ? (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>You haven't applied to any jobs yet.</p>
              <a 
                href="/jobs" 
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Browse Jobs
              </a>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {dashboardData?.applications?.map(app => (
                <div key={app._id} className="border p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{app.job?.title || 'Job'}</h3>
                  <p className="text-gray-600 mt-2">{app.job?.description?.substring(0, 100)}...</p>
                  <p className="mt-2"><strong>Status:</strong> 
                    <span className={`capitalize ml-2 px-2 py-1 rounded text-sm ${
                      app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </p>
                  <p><strong>Applied on:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                  <a 
                    href={`/jobs/${app.job?._id}`} 
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View Job
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;