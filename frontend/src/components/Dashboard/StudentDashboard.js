// src/components/Dashboard/StudentDashboard.js
import React, { useRef } from 'react';
// import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
import LogoutButton from '../Login/LogoutButton';
import './StudentDashboard.css';
import { Link } from 'react-router-dom';
const StudentDashboard = () => {
  const qrRef = useRef();
  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        saveAs(blob, `${student.name}-qr-code.png`);
      });
    }
  };
  const student = JSON.parse(localStorage.getItem('loggedInStudent'));
  if (!student) {
    window.location.href = '/student-login';
    return null;
  }

 
  return (
    <div className="student-dashboard">

     
<Link to="/studentlogs" className="home-btn scan">Student Logs</Link>
      {/* QR and Actions Section */}
      <Link to="/qrdownload" className="home-btn scan" onClick={downloadQR}>Download QR code</Link>

        {/* <button className="download-button" onClick={downloadQR}>
          Download QR Code
        </button> */}
        <LogoutButton userType="student" />
      </div>
    
  );
};

export default StudentDashboard;
