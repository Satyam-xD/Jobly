import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/saved-jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedJobs(res.data);
      } catch (err) {
        console.error('Error fetching saved jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/saved-jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedJobs(prev => prev.filter(job => job._id !== id));
    } catch (err) {
      console.error('Error removing saved job:', err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p>No saved jobs found</p>
      ) : (
        <div className="space-y-4">
          {savedJobs.map(savedJob => (
            <div key={savedJob._id} className="border p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  <Link to={`/jobs/${savedJob.job._id}`} className="text-blue-600 hover:underline">
                    {savedJob.job.title}
                  </Link>
                </h3>
                <p className="text-gray-600">{savedJob.job.company}</p>
              </div>
              <button
                onClick={() => handleRemove(savedJob._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;