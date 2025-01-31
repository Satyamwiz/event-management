import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { validateUser } from '../middleware/validation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getUsers,
  updateUserProfile
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, validateUser, updateUserProfile);
// router.get('/', protect, admin, getUsers);
router.get('/', getUsers);

export default router;