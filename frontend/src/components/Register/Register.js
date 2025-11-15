import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="glass-card">
        <h2>Register as</h2>
        <button className="reg-btn" onClick={() => navigate('/student-register')}>Student</button>
        <button className="reg-btn" onClick={() => navigate('/staff-register')}>Staff</button>
      </div>
    </div>
  );
};

export default Register;
