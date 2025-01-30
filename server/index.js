import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import winston from 'winston';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5000",
  credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: 'Server Error' });
});

// Connect to MongoDB
// connectDB();
const mongoURI = "mongodb+srv://eventadmin:sohamsatyam@cluster0.urkr0.mongodb.net/EMS?retryWrites=true&w=majority&appName=Cluster0";
// const MONGO_URL = "mongodb+srv://sajoshi06:ghost@cluster0.xlzjmwe.mongodb.net/face_recognition?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoURI).then(()=>{
  console.log("Connected to database");
  
}).catch((e)=>{
  console.log(e)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


