import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Applications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_API_URL}/applications`, { headers: { Authorization: `Bearer ${token}` } }).then(res => setApps(res.data));
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Your Applications</h1>
      {apps.map(app => (
        <div key={app._id} className="border p-4 rounded">
          <p><strong>Job:</strong> {app.jobId?.title}</p>
          <p><strong>Status:</strong> {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Applications;