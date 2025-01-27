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
    // const mongoURI = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const mongoURI = process.env.MONGODB_URI;
    
    await mongoose.connect(mongoURI);
    logger.info('MongoDB Connected...');
  } catch (err) {
    logger.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;