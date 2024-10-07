import React, { useState } from 'react';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/actions/authActions'; 
import Header from '../Headers/Header';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       dispatch(signupUser({ name, email, password }));
      setSuccess('Account created successfully');
      setError('');
      setName('');  
      setEmail('');
      setPassword('');
      navigate('/login'); 
    } catch (err) {
      setError('Error creating account. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="auth-container">
      <Header />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

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

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

        <button type="submit" className="auth-button">Sign Up</button>

        <div className="auth-toggle">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
