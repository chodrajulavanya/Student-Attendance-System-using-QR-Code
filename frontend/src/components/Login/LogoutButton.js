import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Ensure this is the correct path to your CSS file

const LogoutButton = ({ userType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userType === 'student') {
      localStorage.removeItem('loggedInStudent');
      navigate('/student-login');
    } else if (userType === 'staff') {
      localStorage.removeItem('loggedInStaff');
      navigate('/staff-login');
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
