import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI; 
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(uri, {});
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};
