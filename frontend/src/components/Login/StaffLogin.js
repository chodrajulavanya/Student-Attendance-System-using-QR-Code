// src/components/StaffLogin/StaffLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedStaff = JSON.parse(localStorage.getItem('registeredStaff')) || [];

    const matchedStaff = storedStaff.find(
      staff => staff.email === email && staff.password === password
    );

    if (matchedStaff) {
      navigate('/staff-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="staff-login-container">
      <h2>Staff Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
  
};

export default StaffLogin;
