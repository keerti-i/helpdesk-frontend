// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ token }) => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const all = res.data;
      const grouped = {
        total: all.length,
        open: all.filter((t) => t.status === 'Open').length,
        inProgress: all.filter((t) => t.status === 'In Progress').length,
        resolved: all.filter((t) => t.status === 'Resolved').length,
        closed: all.filter((t) => t.status === 'Closed').length,
      };
      setStats(grouped);
    } catch (err) {
      console.error('Error loading dashboard stats', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard-container">
      {/* <h2 className="dashboard-title">Welcome Admin </h2> */}
      <div className="dashboard-grid">
        <div className="dashboard-card total">
          <h4>Total Tickets</h4>
          <p>{stats.total}</p>
        </div>
        <div className="dashboard-card open">
          <h4>Open</h4>
          <p>{stats.open}</p>
        </div>
        <div className="dashboard-card inprogress">
          <h4>In Progress</h4>
          <p>{stats.inProgress}</p>
        </div>
        <div className="dashboard-card resolved">
          <h4>Resolved</h4>
          <p>{stats.resolved}</p>
        </div>
        <div className="dashboard-card closed">
          <h4>Closed</h4>
          <p>{stats.closed}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
