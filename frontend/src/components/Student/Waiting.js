// src/components/Waiting/Waiting.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Waiting.css';
const Waiting = () => {
  const [message, setMessage] = useState('Your approval is still pending. Contact your staff.');
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('waitingEmail');

  useEffect(() => {
    const checkStatus = () => {
      const students = JSON.parse(localStorage.getItem('pendingStudents')) || [];
      const student = students.find(s => s.email === userEmail);
      if (student && student.status === 'approved') {
        setMessage('Your request has been approved.');
        setShowLogin(true);
      } else if (student && student.status === 'rejected') {
        setMessage('Your request was rejected.');
        setShowLogin(false);
      }
    };

    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, [userEmail]);

  const handleLoginRedirect = () => {
    navigate('/student-login');
  };

  return (
    <div className="waiting-container">
      <h2>{message}</h2>
      {showLogin && <button onClick={handleLoginRedirect}>Login</button>}
    </div>
  );
  
};

export default Waiting;
