// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import AuthPage from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/AdminTickets'; // For ticket view
import CategoryManager from './pages/CategoryManager';
import UserManager from './pages/UserManager';

import AdminLayout from './components/AdminLayout';
import './App.css';
import AdminTickets from './pages/AdminTickets';


const ProtectedRoute = ({ element, token, role, requiredRole }) => {
  if (!token) return <Navigate to="/login" />;
  if (role !== requiredRole) return <Navigate to={`/dashboard/${role.toLowerCase()}`} />;
  return element;
};

function App() {
  const [token, setToken] = useState('');
const [role, setRole] = useState('');

useEffect(() => {
  if (token) {
    const decoded = jwtDecode(token);
    setRole(decoded.role);
  }
}, [token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<AuthPage setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* User dashboard */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute
              token={token}
              role={role}
              requiredRole="User"
              element={<UserDashboard token={token} />}
            />
          }
        />

        {/* Agent dashboard */}
        <Route
          path="/dashboard/agent"
          element={
            <ProtectedRoute
              token={token}
              role={role}
              requiredRole="Agent"
              element={<AgentDashboard token={token} />}
            />
          }
        />

        {/* Admin main dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute
              token={token}
              role={role}
              requiredRole="Admin"
              element={
                <AdminLayout>
                  <AdminDashboard token={token}/>
                </AdminLayout>
              }
            />
          }
        />

        {/* Admin Tickets (Dashboard.js used for viewing tickets) */}
        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute
              token={token}
              role={role}
              requiredRole="Admin"
              element={
                <AdminLayout>
                  <AdminTickets token={token} />
                </AdminLayout>
              }
            />
          }
        />

        {/* Admin Categories */}
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute
              token={token}
              role={role}
              requiredRole="Admin"
              element={
                <AdminLayout>
                  <CategoryManager token={token} />
                </AdminLayout>
              }
            />
          }
        />

        {/* Admin Users */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              token={token}
              role={role}
              requiredRole="Admin"
              element={
                <AdminLayout>
                  <UserManager token={token} />
                </AdminLayout>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
