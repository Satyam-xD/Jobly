//src/pages/JobDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      }
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!currentUser) return;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/saved-jobs/check?jobId=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsSaved(res.data.isSaved);
      } catch (err) {
        console.error('Error checking saved status:', err);
      }
    };
    checkIfSaved();
  }, [id, currentUser]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/applications',
        { jobId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Applied successfully!');
    } catch (err) {
      alert('Application failed');
    }
  };

  const handleSaveJob = async () => {
    try {
      const token = localStorage.getItem('token');
      if (isSaved) {
        await axios.delete(`http://localhost:5000/api/saved-jobs?jobId=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/saved-jobs', { jobId: id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  if (!job) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company || 'No company specified'}</p>
      <p className="my-4">{job.description}</p>
      <div className="flex space-x-4">
        <button 
          onClick={handleApply} 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Apply
        </button>
        {currentUser?.role === 'jobseeker' && (
          <button
            onClick={handleSaveJob}
            className={`px-4 py-2 ${isSaved ? 'bg-gray-600' : 'bg-blue-600'} text-white rounded hover:${isSaved ? 'bg-gray-700' : 'bg-blue-700'}`}
          >
            {isSaved ? 'Saved' : 'Save Job'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails; // Make sure this default export exists