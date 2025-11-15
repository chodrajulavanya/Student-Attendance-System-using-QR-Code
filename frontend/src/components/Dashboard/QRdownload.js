import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
const QRdownload = () => {
    const student = JSON.parse(localStorage.getItem('loggedInStudent'));
    const qrData = `http://localhost:3000/attendance/${encodeURIComponent(student.name)}`;
    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (canvas) {
          canvas.toBlob((blob) => {
            saveAs(blob, `${student.name}-qr-code.png`);
          });
        }
      };
    const qrRef = useRef();
  
  return (

         <div className="qr-section">
                <h3>Scan this QR Code to mark your attendance:</h3>
                <div ref={qrRef} className="qr-container">
                  <QRCodeCanvas value={qrData} size={256} />
                </div>
                <button className="download-button" onClick={downloadQR}>
          Download QR Code
        </button>
        </div>
  )
}

export default QRdownload