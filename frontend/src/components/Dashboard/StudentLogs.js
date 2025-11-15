import React, { useMemo} from 'react';
import './StudentDashboard.css';
const StudentLogs = () => {
    const student = JSON.parse(localStorage.getItem('loggedInStudent'));
    

    // ✅ Move hooks outside any condition
    const attendanceHistory = useMemo(() => {
      const allHistory = JSON.parse(localStorage.getItem('attendanceHistory')) || [];
      return student
        ? allHistory.filter(entry => entry.name === student.name)
        : [];
    }, [student]);
  
  return (
    <div className='student-dashboard'>
        <div className="student-header">
    {student.image && (
      <img src={student.image} alt="Student" className="student-image" />
    )}
    <div className="student-info">
      <h2>{student.name}</h2>
      <p>Email: {student.email}</p>
      <p>Branch: {student.branch}</p>
    </div>
  </div>

  {/* Attendance Log Section */}
  <div className="attendance-log">
    <h3>📋 Attendance Log</h3>
    {attendanceHistory.length === 0 ? (
      <p>No attendance records found.</p>
    ) : (
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceHistory.map((entry, index) => {
            const date = new Date(entry.timestamp);
            return (
              <tr key={index}>
                <td>{date.toLocaleDateString()}</td>
                <td>{date.toLocaleTimeString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
</div>
  )
}

export default StudentLogs