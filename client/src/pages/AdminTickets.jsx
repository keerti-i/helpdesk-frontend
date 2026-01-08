import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatModal from '../components/ChatModal';
import DescriptionModal from '../components/DescriptionModal';
import '../components/TicketList.css';

const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

const AdminTickets = ({ token }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const statusMatch =
      selectedStatus === 'All' ||
      t.status.toLowerCase() === selectedStatus.toLowerCase();

    const createdAt = new Date(t.createdAt);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const dateMatch =
      (!from || createdAt >= from) &&
      (!to || createdAt <= to);

    return statusMatch && dateMatch;
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Tickets</h2>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div>
          <label htmlFor="statusFilter" style={{ marginRight: '10px' }}>
            Filter by status:
          </label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>From Date:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ padding: '0.4rem', marginLeft: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label>To Date:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ padding: '0.4rem', marginLeft: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      {filteredTickets.length > 0 ? (
        <div className="ticket-grid-container">
          {filteredTickets.map((ticket) => (
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
              <p className="ticket-meta">Category: {ticket.category}</p>
              {/* <button onClick={() => setSelectedTicket(ticket)}>View</button> */}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '1.2rem', color: '#888', textAlign: 'center', marginTop: '2rem' }}>
          No tickets found for the selected filter or date range.
        </p>
      )}

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
  );
};

export default AdminTickets;
