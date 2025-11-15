// src/components/StaffDashboard/StaffDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Login/LogoutButton';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem('pendingStudents')) || [];
    setPendingStudents(students);
    setLoading(false);
  }, []);

  const updateStatus = (email, status) => {
    const confirmed = window.confirm(`Are you sure you want to ${status} this student?`);
    if (confirmed) {
      const updatedStudents = pendingStudents.map(student => {
        if (student.email === email) {
          if (status === 'approved') {
            const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents')) || [];
            approvedStudents.push({ ...student, status });
            localStorage.setItem('approvedStudents', JSON.stringify(approvedStudents));
          }
          return { ...student, status };
        }
        return student;
      });

      setPendingStudents(updatedStudents);
      localStorage.setItem('pendingStudents', JSON.stringify(updatedStudents));
      setToastMessage(`Student ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const filteredStudents = pendingStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>
      {toastMessage && <div className="toast">{toastMessage}</div>}

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div>
          {filteredStudents.length === 0 ? (
            <p>No students to approve/reject.</p>
          ) : (
            <ul className="student-list">
              {filteredStudents.map((student, index) => (
                <li key={index} className={`student-item ${student.status}`}>
                  <div className="student-info">
                    {student.image && <img src={student.image} alt="student" className="student-image" />}
                    <div>
                      <strong>{student.name}</strong> ({student.email})
                      <p>Branch: {student.branch}</p>
                      <span className={`status ${student.status}`}>Status: {student.status}</span>
                    </div>
                  </div>

                  {student.status === 'pending' && (
                    <div className="actions">
                      <button onClick={() => updateStatus(student.email, 'approved')}>Approve</button>
                      <button onClick={() => updateStatus(student.email, 'rejected')}>Reject</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <br />
      <button onClick={() => navigate('/attendance-history')}>View Attendance History</button>
      <br /><br />
      <LogoutButton userType="staff" />
    </div>
  );
};

export default StaffDashboard;
