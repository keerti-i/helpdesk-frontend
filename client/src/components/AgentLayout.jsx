import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserLayout.css';

const AgentLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="user-layout">
      <aside className="sidebar">
        <h2>Help Desk</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/agent">Assigned Tickets</Link>
            </li>
          </ul>
        </nav>

        <div className="logout-section">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default AgentLayout;
