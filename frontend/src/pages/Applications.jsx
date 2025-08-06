//src/pages/Applications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/applications/my-applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(res.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app._id} className="border p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    <Link to={`/jobs/${app.job._id}`} className="text-blue-600 hover:underline">
                      {app.job.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600">{app.job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.status}
                </span>
              </div>
              {app.coverLetter && (
                <div className="mt-3">
                  <h4 className="font-medium">Cover Letter:</h4>
                  <p className="text-gray-700">{app.coverLetter}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;