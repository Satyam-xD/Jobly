import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data.applications);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch applications');
        console.error('Failed to fetch applications:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchApplications();
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
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Applications</h2>
      
      {applications.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">You haven't applied to any jobs yet</p>
          <a 
            href="/jobs" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app._id} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{app.job?.title || 'Job Title'}</h3>
                  <p><strong>Status:</strong> 
                    <span className={`capitalize ml-2 px-2 py-1 rounded text-sm ${
                      app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </p>
                  <p><strong>Cover Letter:</strong> {app.coverLetter || 'No cover letter provided'}</p>
                  <p><strong>Applied on:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <a 
                  href={`/jobs/${app.job?._id}`} 
                  className="text-blue-600 hover:underline"
                >
                  View Job
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;