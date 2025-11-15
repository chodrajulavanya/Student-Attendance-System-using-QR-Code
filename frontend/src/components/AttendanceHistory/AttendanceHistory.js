// src/components/AttendanceHistory.js
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './AttendanceHistory.css';

const AttendanceHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  // Get all attendance history from localStorage
  const filteredAndSortedHistory = useMemo(() => {
    const allHistory = JSON.parse(localStorage.getItem('attendanceHistory')) || [];

    // Fetch all student data from localStorage to include image and branch
    const allStudents = JSON.parse(localStorage.getItem('pendingStudents')) || [];

    const filtered = allHistory.filter(record =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add image and branch data to each attendance record
    const enrichedHistory = filtered.map(record => {
      const student = allStudents.find(student => student.name === record.name);
      return {
        ...record,
        branch: student ? student.branch : 'Unknown', // Default to 'Unknown' if no match
        image: student ? student.image : '', // Default to empty string if no match
      };
    });

    const sorted = enrichedHistory.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  }, [searchTerm, sortOrder]);

  const exportToCSV = () => {
    const csvRows = [
      ['Name', 'Timestamp', 'Branch', 'Image'],
      ...filteredAndSortedHistory.map(row => [row.name, row.timestamp, row.branch, row.image])
    ];

    const csvContent = csvRows.map(e => e.map(field => `"${field}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="attendance-history-container">
      <h2>📋 Attendance History</h2>

      <input
        type="text"
        className="attendance-history-input"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="attendance-history-controls">
        <button onClick={() => setSortOrder('desc')} disabled={sortOrder === 'desc'}>
          Newest First
        </button>
        <button onClick={() => setSortOrder('asc')} disabled={sortOrder === 'asc'}>
          Oldest First
        </button>
        <button onClick={exportToCSV}>
          Export to CSV
        </button>
      </div>

      {filteredAndSortedHistory.length === 0 ? (
        <p className="attendance-history-no-records">No attendance records found.</p>
      ) : (
        <div className="table-wrapper"> {/* Add a wrapper around the table for scrolling */}
          <table className="attendance-history-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Timestamp</th>
                <th>Branch</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.timestamp}</td>
                  <td>{record.branch}</td>
                  <td>
                    {record.image ? (
                      <img src={record.image} alt="Student" className="attendance-history-image" />
                    ) : (
                      'No Image Available'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <Link to="/" className="back-to-home">Back to Home</Link>
      </div>
    </div>
  );
};

export default AttendanceHistory;
