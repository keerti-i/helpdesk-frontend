import React from 'react';
import './DescriptionModal.css';

const DescriptionModal = ({ content, onClose }) => {
  return (
    <div className="desc-modal-backdrop">
      <div className="desc-modal-box">
        <h4>Description</h4>
        <p>{content}</p>
        <button className="desc-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DescriptionModal;
