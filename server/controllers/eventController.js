import Event from '../models/Event.js';
// import { createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from '../config/googleCalendar.js';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('facultyInCharge', 'name email')
      .populate('facultyMembers', 'name email')
      .populate('registeredParticipants.user', 'name email');
    
    res.json(events);
  } catch (error) {
    logger.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('facultyInCharge', 'name email')
      .populate('facultyMembers', 'name email')
      .populate('registeredParticipants.user', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    logger.error('Get event by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const { 
      name, 
      description,
      organizingBody, 
      facultyInCharge, 
      facultyMembers, 
      targetAudience,
      department,
      venue,
      capacity,
      registrationDeadline,
      startDate, 
      endDate,
      status 
    } = req.body;

    // Validate dates
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    if (new Date(registrationDeadline) >= new Date(startDate)) {
      return res.status(400).json({ message: 'Registration deadline must be before start date' });
    }

    let bannerUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      bannerUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: 'Banner image is required' });
    }

    // Create Google Calendar event
    const calendarEventId = await createCalendarEvent({
      name,
      description,
      venue,
      startDate,
      endDate
    });

    const event = await Event.create({
      name,
      description,
      organizingBody,
      facultyInCharge,
      facultyMembers: facultyMembers ? JSON.parse(facultyMembers) : [],
      targetAudience,
      department,
      venue,
      capacity,
      registrationDeadline,
      bannerUrl,
      startDate,
      endDate,
      status,
      googleCalendarEventId: calendarEventId
    });

    const populatedEvent = await Event.findById(event._id)
      .populate('facultyInCharge', 'name email')
      .populate('facultyMembers', 'name email');

    res.status(201).json(populatedEvent);
  } catch (error) {
    logger.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && 
        req.user._id.toString() !== event.facultyInCharge.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.bannerUrl = result.secure_url;
    }

    // Update Google Calendar event if dates changed
    if (req.body.startDate || req.body.endDate) {
      await updateCalendarEvent(event.googleCalendarEventId, {
        name: req.body.name || event.name,
        description: req.body.description || event.description,
        venue: req.body.venue || event.venue,
        startDate: req.body.startDate || event.startDate,
        endDate: req.body.endDate || event.endDate
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate('facultyInCharge', 'name email')
      .populate('facultyMembers', 'name email')
      .populate('registeredParticipants.user', 'name email');

    res.json(updatedEvent);
  } catch (error) {
    logger.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete events' });
    }

    // Delete from Google Calendar
    if (event.googleCalendarEventId) {
      await deleteCalendarEvent(event.googleCalendarEventId);
    }

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    logger.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Mark attendance


// Get event statistics
export const getEventStats = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const event = await Event.findById(eventId)
      .populate('registeredParticipants.user', 'name email department');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const stats = {
      totalRegistered: event.registeredParticipants.length,
      totalAttended: event.registeredParticipants.filter(p => p.attendance).length,
      attendanceRate: `${((event.registeredParticipants.filter(p => p.attendance).length / 
                         event.registeredParticipants.length) * 100).toFixed(2)}%`,
      departmentWiseRegistration: {},
      registrationTimeline: []
    };

    // Calculate department-wise registration
    event.registeredParticipants.forEach(participant => {
      const dept = participant.user.department;
      stats.departmentWiseRegistration[dept] = (stats.departmentWiseRegistration[dept] || 0) + 1;
    });

    res.json(stats);
  } catch (error) {
    logger.error('Get event stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};