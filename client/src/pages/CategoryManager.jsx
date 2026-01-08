import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
const CategoryManager = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [agents, setAgents] = useState({});
  const [allAgents, setAllAgents] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(res.data);
  };

  const fetchAgents = async () => {
    const res = await axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAllAgents(res.data.filter((u) => u.role === 'Agent'));
  };

  useEffect(() => {
    fetchCategories();
    fetchAgents();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/categories', { name: newCategory }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating category');
    }
  };

  const handleAssignAgent = async (categoryId, agentId) => {
    try {
      const category = categories.find((c) => c._id === categoryId);
      await axios.put(`http://localhost:5000/api/categories/${categoryId}`, {
        name: category.name,
        assignedAgent: agentId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      alert('Failed to assign agent');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCategories();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Manage Categories</h3>

      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button className='category-button' onClick={handleAdd}>Add</button>
      </div>

      <table className="category-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Assigned Agent</th>
      <th>Change</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((cat) => (
      <tr key={cat._id}>
        <td>{cat.name}</td>
        <td>{cat.assignedAgent?.name || 'None'}</td>
        <td>
          <select
            onChange={(e) => handleAssignAgent(cat._id, e.target.value)}
            value={cat.assignedAgent?._id || ''}
          >
            <option value="">-- Select Agent --</option>
            {allAgents.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </td>
        <td>
          <button className='category-button' onClick={() => handleDelete(cat._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default CategoryManager;
