import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard/admin' },
    { name: 'Tickets', path: '/admin/tickets' },
    { name: 'Categories', path: '/admin/categories' },
    { name: 'Users', path: '/admin/users' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Help Desk</h2>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link className={location.pathname === item.path ? 'active' : ''} to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="logout-section-1">
          <button className="logout-button-1" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
