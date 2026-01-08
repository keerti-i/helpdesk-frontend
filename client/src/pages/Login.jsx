import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthPage = ({ setToken }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', {
          email: form.email,
          password: form.password,
        });
        const token = res.data.token;
        setToken(token);
        localStorage.setItem('user', JSON.stringify({ token }));

        const decoded = jwtDecode(token);
        const role = decoded.role;

        if (role === 'Admin') navigate('/dashboard/admin');
        else if (role === 'Agent') navigate('/dashboard/agent');
        else navigate('/dashboard/user');
      } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
      }
    } else {
      try {
        const userForm = { ...form, role: 'User' };
        const res = await axios.post('http://localhost:5000/api/users/register', userForm);

        const token = res.data.token;
        setToken(token);
        localStorage.setItem('user', JSON.stringify({ token }));

        const decoded = jwtDecode(token);
        const role = decoded.role;

        if (role === 'Admin') navigate('/dashboard/admin');
        else if (role === 'Agent') navigate('/dashboard/agent');
        else navigate('/dashboard/user');
      } catch (err) {
        alert(err.response?.data?.message || 'Error registering');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h3>{isLogin ? 'Login' : 'Register'}</h3>

        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            required
          />
        )}

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        />

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

        <p style={{ marginTop: '10px' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
