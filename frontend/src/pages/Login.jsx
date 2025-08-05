import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto space-y-4">
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default Login;