import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    // required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  organizingBody: {
    type: String,
    // required: true,
    trim: true
  },
  facultyInCharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  facultyMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  targetAudience: [{
    type: String,
    enum: ['all', 'students', 'teachers'],
    default: ['all']
  }],
  department: {
    type: String,
    // required: true
  },
  venue: {
    type: String,
    // required: true
  },
  capacity: {
    type: Number,
    // required: true,
    min: 1
  },
  registrationDeadline: {
    type: Date,
    // required: true
  },
  bannerUrl: {
    type: String,
    // required: true
  },
  startDate: {
    type: Date,
    // required: true
  },
  endDate: {
    type: Date,
    // required: true
  },
  googleCalendarEventId: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  registeredParticipants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    attendance: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

eventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Event = mongoose.model('Event', eventSchema);
export default Event;