import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatModal from './ChatModal';
import DescriptionModal from './DescriptionModal';
import './TicketList.css';

const TicketList = ({ token }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState(null);

  useEffect(() => {
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
    fetchTickets();
        
  }, [token]);

  return (
    <div>
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
            <p className="ticket-meta">Category: {ticket.category}</p>
            <button className="chat-open-button" onClick={() => setSelectedTicket(ticket)}>Open Chat</button>
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
  );
};

export default TicketList;
