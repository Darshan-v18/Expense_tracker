import React, { useState } from 'react';
import axios from 'axios';
import './NewPassword.css'; 
import { useNavigate, useLocation } from 'react-router-dom';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, newPassword);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/reset-password`, {
        email,
        newPassword: newPassword,
      });
      if (response.status === 200) {
        setMessage('Password reset successfully. You can now log in.');
        navigate('/login');
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="new-password-container">
      <form className="new-password-form" onSubmit={handleSubmit}>
        <h2>Enter New Password</h2>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Reset Password</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default NewPassword;
