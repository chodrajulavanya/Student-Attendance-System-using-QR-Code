import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './components/Register/Register';
import StudentLogin from './components/Login/StudentLogin';
import StaffLogin from './components/Login/StaffLogin';
import QRScanner from './components/QRScanner/QRScanner';
import Attendance from './components/Attendance/Attendance';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import StaffDashboard from './components/Dashboard/StaffDashboard';
import StudentRegister from './components/StudentRegister/StudentRegister'; // Student register import
import StaffRegister from './components/StaffRegister/StaffRegister'; // Staff register import
import Waiting from './components/Student/Waiting';
import QRdownload from './components/Dashboard/QRdownload';
import AttendanceHistory from './components/AttendanceHistory/AttendanceHistory';
import StudentLogs from './components/Dashboard/StudentLogs';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student-register" element={<StudentRegister />} /> {/* Student Registration Route */}
      <Route path="/staff-register" element={<StaffRegister />} /> {/* Staff Registration Route */}
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route path="/qrcode" element={<QRScanner />} />
      <Route path="/attendance/:name" element={<Attendance />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      <Route path="/waiting" element={<Waiting />} />
      <Route path="/scan" element={<QRScanner/>}/>
      <Route path="/qrdownload" element={<QRdownload/>}/>
      <Route path="/studentlogs" element={<StudentLogs/>}/>
      <Route path='/attendance-history' element={<AttendanceHistory/>}/>
    </Routes>
  </BrowserRouter>
);
