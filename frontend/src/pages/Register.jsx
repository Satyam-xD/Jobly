import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto space-y-4">
      <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Register</button>
    </form>
  );
};

export default Register;