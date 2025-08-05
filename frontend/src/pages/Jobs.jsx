import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/jobs`).then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Available Jobs</h1>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p>{job.company}</p>
          <Link to={`/jobs/${job._id}`} className="text-blue-600">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Jobs;