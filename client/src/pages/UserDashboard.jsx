import React, { useState } from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import { IoAddCircle } from "react-icons/io5";
import '../styles/UserDashboard.css'; 
import UserLayout from '../components/UserLayout'; 

const UserDashboard = ({ token }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <UserLayout> 
      <div className="user-dashboard">
        <div className="tickets-header">
          <h2>Tickets</h2>
          <IoAddCircle
            title="Add Ticket"
            className="add-ticket-icon"
            onClick={() => setShowForm((prev) => !prev)}
          />
        </div>

        {showForm && <TicketForm token={token} onTicketCreated={() => {}} />}
        <TicketList token={token} />
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
