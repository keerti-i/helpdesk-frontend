import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userForm = { ...form, role: 'User' };

      await axios.post('/api/users/register', userForm);
      alert('Registered! Now login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h3>Register</h3>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate('/login')}>Login</button>
      </form>
    </div>
  );
};

export default Register;
