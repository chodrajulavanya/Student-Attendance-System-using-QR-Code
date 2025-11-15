import React from 'react';
import Header from '../components/StaffRegister/Header';
import Login from '../components/Login/StudentLogin';
import Register from '../components/Register/Register';
import StudentDashboard from '../components/Dashboard/StudentDashboard';
import StaffDashboard from '../components/Dashboard/StaffDashboard';
import QRScanner from '../components/QRScanner/QRScanner';
import AttendanceLogs from '../components/AttendanceLogs/AttendanceLogs';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      <section id="login">
        <h2>Login</h2>
        <Login />
      </section>

      <section id="register">
        <h2>Register</h2>
        <Register />
      </section>

      <section id="student-dashboard">
        <h2>Student Dashboard</h2>
        <StudentDashboard />
      </section>

      <section id="staff-dashboard">
        <h2>Staff Dashboard</h2>
        <StaffDashboard />
      </section>

      <section id="qr-scanner">
        <h2>QR Scanner</h2>
        <QRScanner />
      </section>

      <section id="attendance-logs">
        <h2>Attendance Logs</h2>
        <AttendanceLogs />
      </section>
    </div>
  );
};

export default HomePage;
