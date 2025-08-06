//src/pages/Register.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // ✅ use the configured axios instance

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ corrected endpoint (base URL already includes /api)
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
      console.error('Registration Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="jobseeker">Jobseeker</option>
        <option value="employer">Employer</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
