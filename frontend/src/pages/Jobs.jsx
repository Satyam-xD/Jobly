import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading jobs...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Jobs</h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <div className="space-y-6">
        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No jobs available at the moment</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.description}</p>
              <p><strong>Budget:</strong> ₹{job.budget}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Flexible'}</p>
              <p><strong>Skills:</strong> {job.skillsRequired?.join(', ') || 'None specified'}</p>
              <p><strong>Posted by:</strong> {job.createdBy?.name || 'Unknown'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;