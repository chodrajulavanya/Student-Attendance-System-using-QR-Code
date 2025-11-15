// src/components/StudentRegister/StudentRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentRegister.css';

const StudentRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const newStudent = {
      name,
      email,
      password,
      branch,
      image,
      status: 'pending',
    };

    const existingStudents = JSON.parse(localStorage.getItem('pendingStudents')) || [];
    const alreadyExists = existingStudents.find(student => student.email === email);

    if (alreadyExists) {
      alert('Student with this email already exists.');
      return;
    }

    existingStudents.push(newStudent);
    localStorage.setItem('pendingStudents', JSON.stringify(existingStudents));
    localStorage.setItem('waitingEmail', email);

    alert('Registration successful! Waiting for staff approval.');
    navigate('/waiting');
  };

  return (
    <div className="student-register-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
          <option value="" disabled hidden>Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="IT">IT</option>
          <option value="MECH">MECH</option>
          <option value="CSE-AIML">CSE-AIML</option>
          <option value="CSE-DS">CSE-DS</option>
        </select>

        <div className="image-upload-section">
          {image ? (
            <>
              <img src={image} alt="Preview" className="image-preview" />
              <p>Image Uploaded</p>
            </>
          ) : (
            <p>Please upload your image</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
