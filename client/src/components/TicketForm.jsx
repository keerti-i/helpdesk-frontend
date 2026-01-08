import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicketForm.css';

const TicketForm = ({ token, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Error loading categories', err);
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tickets', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ title: '', description: '', category: '' });
      onTicketCreated();
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting ticket');
    }
  };

  return (
    <div className="ticket-container">
      <form className="ticket-card" onSubmit={handleSubmit}>
        <h2>Submit a Ticket</h2>

        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
