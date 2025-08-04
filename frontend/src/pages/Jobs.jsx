import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Jobs</h2>
      <div className="space-y-6">
        {jobs.map(job => (
          <div key={job._id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.description}</p>
            <p><strong>Budget:</strong> ₹{job.budget}</p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
            <p><strong>Posted by:</strong> {job.createdBy?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
