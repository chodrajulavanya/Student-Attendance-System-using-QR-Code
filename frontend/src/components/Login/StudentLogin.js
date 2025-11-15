// src/components/StudentLogin/StudentLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedStudents = JSON.parse(localStorage.getItem('pendingStudents')) || [];

    const student = storedStudents.find(
      s => s.email === email && s.password === password
    );

    if (!student) {
      alert('Invalid credentials');
    } else if (student.status !== 'approved') {
      alert('Your registration is still pending approval.');
    } else {
      localStorage.setItem('loggedInStudent', JSON.stringify(student));
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="student-login-container">
      <h2>Student Login</h2>
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

export default StudentLogin;
