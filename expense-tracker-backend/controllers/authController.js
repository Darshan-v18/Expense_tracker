const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Otp } = require('../models');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Register User
const register = async (req, res) => {
  const { name, email,  password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name,email, password: hashedPassword });
    

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // console.log(token);

    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
const login = async (req, res) => {
  const {email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(email,password,user.id)

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    res.json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to send OTP email
const sendOTPEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, 
        },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}`,
    };
  
    return transporter.sendMail(mailOptions);
  };


// Request password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
   
      const otp = crypto.randomInt(100000, 999999).toString(); 
  
      
      await Otp.create({ userId: user.id, otp });
  
      
      await sendOTPEmail(email, otp);
  
      return res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.log(error);
      console.error('Error sending OTP:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Verify OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const otpRecord = await Otp.findOne({ where: { userId: user.id, otp } });
      if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP' });
  
      
      await Otp.destroy({ where: { userId: user.id, otp } });
  
      return res.status(200).json({ message: 'OTP verified' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Reset password
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword; 
      await user.save();
  
      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
module.exports = { register, login, sendOTPEmail, requestPasswordReset,verifyOTP,resetPassword };
