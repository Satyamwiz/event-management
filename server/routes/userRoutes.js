import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { validateUser } from '../middleware/validation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
  userCount
} from '../controllers/userController.js';

const router = express.Router();
router.get('/count', userCount);
router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', protect, validateUser, updateUserProfile);
// router.get('/', protect, admin, getUsers);
router.get('/', getUsers);

export default router;