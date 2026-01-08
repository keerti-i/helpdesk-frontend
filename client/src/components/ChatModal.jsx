import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './ChatModal.css';

const ChatModal = ({ token, ticket, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const currentUserId = jwtDecode(token).id;

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tickets/${ticket._id}/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [ticket]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(
        `http://localhost:5000/api/tickets/${ticket._id}/chat`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setText('');
      fetchMessages();
    } catch (err) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="chat-modal-backdrop">
      <div className="chat-modal">
        <div className="chat-header">
          <span>Chat - {ticket.title}</span>
          <button onClick={onClose} className="chat-close-btn">×</button>
        </div>

        <div className="chat-body">
          {messages.map((msg, idx) => {
            const isSender = msg.sender?._id === currentUserId;
            return (
              <div
                key={idx}
                className={isSender ? 'chat-bubble-sender' : 'chat-bubble-receiver'}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
