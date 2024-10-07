import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import './Auth.css'; 
import Header from '../Headers/Header';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  return (
    <div className="auth-container">
      <Header />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email" // Changed to email for better validation
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Fixed function name to camelCase
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
        </button>
        <p className="auth-toggle">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <p className="auth-toggle">
          <button 
            type="button" // Button for forgot password action
            onClick={handleForgotPassword} 
            style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
            Forgot Password?
          </button>
        </p>
      </form>
      {showModal && <ForgotPasswordModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Login;
