import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
const UserManager = ({ token }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert('Error loading users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers(); // refresh after update
    } catch (err) {
      alert('Error updating role');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Manage Users</h3>
      <table className="user-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Current Role</th>
      <th>Change Role</th>
    </tr>
  </thead>
  <tbody>
    {users.map((u) => (
      <tr key={u._id}>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.role}</td>
        <td>
          <select
            value={u.role}
            onChange={(e) => handleRoleChange(u._id, e.target.value)}
          >
            <option value="User">User</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default UserManager;
