import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import winston from 'winston';

export const registerUser = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      department, 
      studentId, 
      year, 
      googleCalendarId 
    } = req.body;

    
    const userExists = await User.findOne({ 
      $or: [
        { email },
        ...(studentId ? [{ studentId }] : [])
      ]
    });
    
    if (userExists) {
      return res.status(400).json({ 
        message: userExists.email === email 
          ? 'Email already registered' 
          : 'Student ID already registered'
      });
    }

    // Validate required fields based on role
    if ((role === 'student' || role === 'teacher') && !department) {
      return res.status(400).json({ 
        message: 'Department is required for students and teachers' 
      });
    }

    if (role === 'student' && (!studentId || !year)) {
      return res.status(400).json({ 
        message: 'Student ID and year are required for students' 
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      ...(department && { department }),
      ...(studentId && { studentId }),
      ...(year && { year }),
      ...(googleCalendarId && { googleCalendarId })
    });

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ...(user.department && { department: user.department }),
      ...(user.studentId && { studentId: user.studentId }),
      ...(user.year && { year: user.year })
    });
  } catch (error) {
    logger.error('Register user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    logger.error('Login user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    logger.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    logger.error('Update user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};