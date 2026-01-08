import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatModal from '../components/ChatModal';
import DescriptionModal from '../components/DescriptionModal';
import TicketList from '../components/TicketList';
import '../components/TicketList.css';
import AgentLayout from '../components/AgentLayout';

const AgentDashboard = ({ token }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState(null);

  const fetchAssignedTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets/assigned', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching assigned tickets:', err);
    }
  };

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAssignedTickets();
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <AgentLayout>
      <div style={{ padding: '2rem' }}>
      <div className="ticket-grid-container">
        {tickets.map((ticket) => (
          <div className="ticket-card-item" key={ticket._id}>
            <h3>{ticket.title}</h3>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p>
              <strong>Description:</strong>{' '}
              {ticket.description.slice(0, 30)}...
              {ticket.description.length > 30 && (
                <span
                  style={{
                    color: '#987AF5',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    textDecoration: 'underline',
                  }}
                  onClick={() => setExpandedDesc(ticket.description)}
                >
                  View More
                </span>
              )}
            </p>
            <p><strong>Category:</strong> {ticket.category}</p>
            <label>
              Change Status:{' '}
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </label>
            <br />
            <button className='chat-open-button' onClick={() => setSelectedTicket(ticket)}>
              Open Chat
            </button>
          </div>
        ))}
      </div>

      {selectedTicket && (
        <ChatModal
          token={token}
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      {expandedDesc && (
        <DescriptionModal
          content={expandedDesc}
          onClose={() => setExpandedDesc(null)}
        />
      )}
    </div>
    </AgentLayout>
  );
};



export default AgentDashboard;
