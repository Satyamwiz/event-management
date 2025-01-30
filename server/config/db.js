import mongoose from 'mongoose';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const connectDB = async () => {
  try {
    // Replace with your MongoDB connection string
     const mongoURI = "mongodb+srv://sajoshi06:ghost@cluster0.xlzjmwe.mongodb.net/face_recognition?retryWrites=true&w=majority&appName=Cluster0";
    // const mongoURI = process.env.MONGODB_URI;
    
    const resposne = await mongoose.connect(mongoURI);
    console.log(resposne)
    // logger.info('MongoDB Connected...');
  } catch (err) {
    // logger.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;