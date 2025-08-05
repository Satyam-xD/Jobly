import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchApplications();
  }, [currentUser]);

  if (loading) {
    return <div className="text-center mt-10">Loading applications...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Applications</h2>
      
      {applications.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">You haven't applied to any jobs yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{app.job?.title || 'Job Title'}</h3>
              <p><strong>Status:</strong> <span className="capitalize">{app.status}</span></p>
              <p><strong>Cover Letter:</strong> {app.coverLetter || 'No cover letter provided'}</p>
              <p><strong>Applied on:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;