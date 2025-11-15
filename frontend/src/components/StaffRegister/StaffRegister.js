// src/components/StaffRegister/StaffRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffRegister.css';

const StaffRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const newStaff = { email, password, name };
    const storedStaffs = JSON.parse(localStorage.getItem('registeredStaffs')) || [];

    // Optional: Check if email already exists
    const alreadyExists = storedStaffs.some((staff) => staff.email === email);
    if (alreadyExists) {
      alert('Staff with this email already exists.');
      return;
    }

    storedStaffs.push(newStaff);
    localStorage.setItem('registeredStaffs', JSON.stringify(storedStaffs));

    alert('Registration successful. You can now log in.');
    navigate('/staff-login');
  };

  return (
    <div className="staff-register-container">
      <h2>Staff Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StaffRegister;
