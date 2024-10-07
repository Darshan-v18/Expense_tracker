import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordModal.css'; 
import { useNavigate } from 'react-router-dom';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true); 
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/password-reset`, { email });
      setOtpSent(true);
      setMessage('OTP sent to your email.');
    } catch (error) {
      setMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const handleConfirmOtp = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/verify-otp`, { email, otp });
      console.log(response.data);
      if (response.status === 200) {
        setMessage('OTP confirmed. You can now reset your password.');
        console.log(email);
        navigate('/new-password', { state: { email } });
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setMessage('Error confirming OTP. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Forgot Password</h2>
        {!otpSent ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button onClick={handleSendOtp} disabled={loading}> 
              {loading ? 'Sending...' : 'Send OTP'} 
            </button>
          </>
        ) : (
          <>
            {loading ? ( 
              <p>Loading OTP...</p>
            ) : (
              <>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
                <button onClick={handleConfirmOtp}>Confirm OTP</button>
              </>
            )}
          </>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
