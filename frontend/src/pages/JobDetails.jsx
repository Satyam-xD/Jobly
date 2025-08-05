import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const [jobRes, appsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/jobs/${id}`),
          currentUser?.role === 'client' ? 
            axios.get(`http://localhost:5000/api/applications/job/${id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }) : 
            Promise.resolve(null)
        ]);

        setJob(jobRes.data.job);
        if (appsRes) setApplications(appsRes.data.applications);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, currentUser]);

  const handleApplicationStatus = async (appId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/applications/${appId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app._id === appId ? { ...app, status } : app
      ));
      
      // Also update job status if accepted
      if (status === 'accepted') {
        setJob(prev => ({ ...prev, status: 'in-progress' }));
      }
      
      alert('Application status updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{job?.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job?.description}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>
            <div className="space-y-3">
              <p><strong>Budget:</strong> ${job?.budget}</p>
              <p><strong>Category:</strong> {job?.category}</p>
              <p><strong>Status:</strong> {job?.status}</p>
              <p><strong>Posted on:</strong> {new Date(job?.createdAt).toLocaleDateString()}</p>
              <p><strong>Deadline:</strong> {job?.deadline ? new Date(job.deadline).toLocaleDateString() : 'Flexible'}</p>
              <p><strong>Location:</strong> {job?.location}</p>
              <p><strong>Skills Required:</strong> {job?.skillsRequired?.join(', ') || 'None specified'}</p>
              <p><strong>Posted by:</strong> {job?.createdBy?.name}</p>
              
              {job?.assignedFreelancer && (
                <p><strong>Freelancer:</strong> {job.assignedFreelancer.name}</p>
              )}
            </div>
          </div>
        </div>

        {currentUser?.role === 'client' && job?.createdBy?._id === currentUser.id && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Applications ({applications.length})</h2>
            
            {applications.length === 0 ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <p>No applications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app._id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{app.applicant.name}</h3>
                        <p className="text-gray-600">{app.applicant.bio}</p>
                        <p className="mt-2"><strong>Skills:</strong> {app.applicant.skills?.join(', ') || 'Not specified'}</p>
                        <p className="mt-2"><strong>Cover Letter:</strong></p>
                        <p className="text-gray-700 whitespace-pre-line">{app.coverLetter}</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className={`capitalize px-2 py-1 rounded text-sm ${
                          app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status}
                        </span>
                        
                        {app.status === 'pending' && (
                          <div className="mt-2 space-x-2">
                            <button 
                              onClick={() => handleApplicationStatus(app._id, 'accepted')}
                              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleApplicationStatus(app._id, 'rejected')}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;