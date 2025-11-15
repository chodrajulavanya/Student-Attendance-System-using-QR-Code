// src/components/AdminDashboard/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import LogoutButton from '../Login/LogoutButton';
const AdminDashboard = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [pendingStaffs, setPendingStaffs] = useState([]);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('pendingStudents')) || [];
    const staffs = JSON.parse(localStorage.getItem('pendingStaffs')) || [];
    setPendingStudents(students);
    setPendingStaffs(staffs);
  }, []);

  const updateStatus = (type, email, status) => {
    const key = type === 'student' ? 'pendingStudents' : 'pendingStaffs';
    const items = JSON.parse(localStorage.getItem(key)) || [];

    const updatedItems = items.map(item => 
      item.email === email ? { ...item, status } : item
    );
    localStorage.setItem(key, JSON.stringify(updatedItems));

    if (type === 'student') setPendingStudents(updatedItems);
    else setPendingStaffs(updatedItems);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Pending Students</h3>
      {pendingStudents.map((student, index) => (
        <div key={index}>
          {student.name} ({student.email}) - Status: {student.status}
          {student.status === 'pending' && (
            <>
              <button onClick={() => updateStatus('student', student.email, 'approved')}>Approve</button>
              <button onClick={() => updateStatus('student', student.email, 'rejected')}>Reject</button>
            </>
          )}
        </div>
      ))}

      <h3>Pending Staffs</h3>
      {pendingStaffs.map((staff, index) => (
        <div key={index}>
          {staff.name} ({staff.email}) - Status: {staff.status}
          {staff.status === 'pending' && (
            <>
              <button onClick={() => updateStatus('staff', staff.email, 'approved')}>Approve</button>
              <button onClick={() => updateStatus('staff', staff.email, 'rejected')}>Reject</button>
            </>
          )}
        </div>
      ))}

      <LogoutButton userType="admin" />
    </div>
  );
};

export default AdminDashboard;
