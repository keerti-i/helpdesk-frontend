import React, { useState } from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';

const Dashboard = ({ token }) => {
  const [refresh, setRefresh] = useState(false);

  const handleTicketCreated = () => setRefresh(!refresh);

  return (
    <div>
      <TicketForm token={token} onTicketCreated={handleTicketCreated} />
      <TicketList key={refresh} token={token} />
    </div>
  );
};

export default Dashboard;
