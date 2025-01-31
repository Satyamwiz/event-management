import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats
} from '../controllers/eventController.js';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes
router.use(protect);


// Routes requiring admin or faculty privileges
// router.post('/', authorize(['admin', 'teacher']), upload.single('banner'), createEvent);
router.put('/:id', authorize(['admin', 'teacher']), upload.single('banner'), updateEvent);
router.delete('/:id', authorize(['admin']), deleteEvent);
router.post('/', createEvent);


router.get('/:eventId/stats', authorize(['admin', 'teacher']), getEventStats);

export default router;