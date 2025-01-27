import Joi from 'joi';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

const userSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address'
    }),
  password: Joi.string()
    .pattern(passwordRegex)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    }),
  role: Joi.string()
    .valid('admin', 'teacher', 'student')
    .required(),
  department: Joi.string()
    .when('role', {
      is: Joi.valid('student', 'teacher'),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
  studentId: Joi.string()
    .when('role', {
      is: 'student',
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
  year: Joi.number()
    .when('role', {
      is: 'student',
      otherwise: Joi.optional()
    })
});

const eventSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Event name must be at least 3 characters long',
      'string.max': 'Event name cannot exceed 100 characters'
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters'
    }),
  organizingBody: Joi.string().required(),
  facultyInCharge: Joi.string().required(),
  facultyMembers: Joi.string().optional(),
  targetAudience: Joi.array()
    .items(Joi.string().valid('all', 'students', 'teachers'))
    .default(['all']),
  department: Joi.string().required(),
  venue: Joi.string().required(),
  capacity: Joi.number()
    .min(1)
    .required()
    .messages({
      'number.min': 'Capacity must be at least 1'
    }),
  registrationDeadline: Joi.date()
    .required()
    .messages({
      'date.base': 'Please provide a valid registration deadline'
    }),
  startDate: Joi.date()
    .greater('now')
    .required()
    .messages({
      'date.greater': 'Start date must be in the future'
    }),
  endDate: Joi.date()
    .min(Joi.ref('startDate'))
    .required()
    .messages({
      'date.min': 'End date must be after start date'
    }),
  status: Joi.string()
    .valid('draft', 'published', 'cancelled', 'completed')
    .default('draft')
});

const registrationSchema = Joi.object({
  eventId: Joi.string().required(),
  userId: Joi.string().required()
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ messages: errors });
  }
  next();
};

export const validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ messages: errors });
  }
  next();
};

export const validateRegistration = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};