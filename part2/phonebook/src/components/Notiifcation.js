import React from 'react';
import './Notification.css';

const Notification = ({ message, status }) => {
  return (
    <div className={`${status} notification`}>
      {message}
    </div>
  );
};

export default Notification;
