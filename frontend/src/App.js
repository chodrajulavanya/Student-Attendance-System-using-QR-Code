// src/App.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => (
  <div className="home-container">
    <div className="glass-card">
      <header>
        <h1 className="title">VASAVI COLLEGE OF ENGINEERING</h1>
        <p className="subtext">(Private Un-aided Non-minority Autonomous Institution)</p>
        <p className="subtext">ACCREDITED BY NAAC WITH 'A++' GRADE</p>
        <p className="subtext">Affiliated to Osmania University and Approved by AICTE</p>
      </header>

      <div className="animated-box">
        <h2 className="system-title">QR Based Attendance System</h2>
        <p className="subtext">Smart & Contactless Attendance Tracking</p>
      </div>

      <div className="btn-group">
        <Link to="/register" className="home-btn">Register</Link>
        <Link to="/student-login" className="home-btn">Student Login</Link>
        <Link to="/staff-login" className="home-btn">Staff Login</Link>
        <Link to="/scan" className="home-btn scan">Scan</Link>
      </div>
    </div>
  </div>
);

export default App;
