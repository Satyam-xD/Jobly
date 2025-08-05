import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({ title: '', company: '', description: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, formData, { headers: { Authorization: `Bearer ${token}` } });
    alert('Job posted successfully');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto space-y-4">
      <input name="title" placeholder="Job Title" onChange={handleChange} className="w-full border p-2" />
      <input name="company" placeholder="Company" onChange={handleChange} className="w-full border p-2" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Post Job</button>
    </form>
  );
};

export default PostJob;
