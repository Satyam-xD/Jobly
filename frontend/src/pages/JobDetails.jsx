import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`${import.meta.env.VITE_API_URL}/applications/apply`, { jobId: job._id }, { headers: { Authorization: `Bearer ${token}` } });
    alert('Applied successfully!');
  };

  if (!job) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company}</p>
      <p>{job.description}</p>
      <button onClick={handleApply} className="mt-4 px-4 py-2 bg-green-600 text-white">Apply</button>
    </div>
  );
};

export default JobDetails;