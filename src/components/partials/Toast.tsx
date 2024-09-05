import React from 'react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`notification is-${type} toast`} style={{ position: 'fixed', top: '20px', right: '20px' }}>
      <button className="delete" onClick={onClose}></button>
      {message}
    </div>
  );
};

export default Toast;
