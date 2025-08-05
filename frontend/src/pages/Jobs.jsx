import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data.jobs);
      } catch (err) {
        setError('Failed to load jobs. Please try again later.');
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyToJob = async (jobId) => {
    if (!currentUser) {
      alert('Please login to apply for jobs');
      return;
    }

    if (currentUser.role !== 'freelancer') {
      alert('Only freelancers can apply for jobs');
      return;
    }

    const coverLetter = prompt('Enter your cover letter:');
    if (!coverLetter) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/applications',
        { job: jobId, coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
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
              <p className="text-gray-600">{job.description.substring(0, 200)}...</p>
              <p><strong>Budget:</strong> ${job.budget}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Flexible'}</p>
              <p><strong>Skills:</strong> {job.skillsRequired?.join(', ') || 'None specified'}</p>
              <p><strong>Posted by:</strong> {job.createdBy?.name || 'Unknown'}</p>
              
              <div className="mt-4 flex space-x-3">
                <a 
                  href={`/jobs/${job._id}`} 
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </a>
                
                {currentUser?.role === 'freelancer' && (
                  <button 
                    onClick={() => applyToJob(job._id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;