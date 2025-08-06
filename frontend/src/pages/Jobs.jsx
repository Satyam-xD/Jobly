//src/pages/Jobs.jsx


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Available Jobs</h1>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p>{job.company || 'No company specified'}</p>
          <Link to={`/jobs/${job._id}`} className="text-blue-600">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Jobs;