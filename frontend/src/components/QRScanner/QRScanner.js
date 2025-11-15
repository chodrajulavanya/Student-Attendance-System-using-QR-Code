import React, { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import './QRScanner.css';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  const startScanning = () => {
    setIsScanning(true);
    scannerRef.current = new QrScanner(videoRef.current, (result) => {
      setResult(result.data);
      setError('');
      saveAttendance(result.data);
      stopScanning();
    });
    scannerRef.current.start();
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
      setResult(result.data);
      setError('');
      saveAttendance(result.data);
    } catch (err) {
      setError('Failed to read QR code. Make sure the image is clear.');
    }
  };

  const saveAttendance = (qrData) => {
    const name = qrData.split('/').pop();
    const students = JSON.parse(localStorage.getItem('approvedStudents')) || [];
    const matchedStudent = students.find(s => s.name === decodeURIComponent(name));

    const timestamp = new Date().toLocaleString();
    const newRecord = {
      name: decodeURIComponent(name),
      timestamp,
      branch: matchedStudent ? matchedStudent.branch : 'Unknown'
    };

    const history = JSON.parse(localStorage.getItem('attendanceHistory')) || [];
    history.push(newRecord);
    localStorage.setItem('attendanceHistory', JSON.stringify(history));
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="qr-scanner-container">
      <h2>📷 Scan QR Code</h2>

      {!isScanning ? (
        <button onClick={startScanning} className="qr-scanner-button">
          Start Live Scanning
        </button>
      ) : (
        <button onClick={stopScanning} className="qr-scanner-button">
          Stop Scanning
        </button>
      )}

      <video ref={videoRef} className="qr-scanner-video" />

      <div className="upload-section">
        <p>Or upload a QR code image:</p>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {result && (
        <div className="success-message">
          <h3>✅ Your attendance has been marked successfully!</h3>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
