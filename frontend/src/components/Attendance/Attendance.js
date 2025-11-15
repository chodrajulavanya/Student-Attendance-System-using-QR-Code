import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Attendance.css';  // Import the CSS file

const Attendance = () => {
  const { name } = useParams();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('attendanceHistory')) || [];
    history.push({ name, time: new Date().toLocaleString() });
    localStorage.setItem('attendanceHistory', JSON.stringify(history));
  }, [name]);

  return (
    <div className="attendance-container">
      <h2>Hi {name}, your attendance has been marked successfully!</h2>
    </div>
  );
};

export default Attendance;
