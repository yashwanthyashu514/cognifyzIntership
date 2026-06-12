import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cognifyz_internship', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedConnection = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Auto-heal misspelled or capitalized statuses in the database
    try {
      const db = conn.connection.db;
      const tasksCollection = db.collection('tasks');

      const inProgressUpdate = await tasksCollection.updateMany(
        { status: { $in: ['In Progrees', 'In Progress', 'inprogress', 'In progress'] } },
        { $set: { status: 'in-progress' } }
      );

      const completedUpdate = await tasksCollection.updateMany(
        { status: { $in: ['Complete', 'complete', 'Completed'] } },
        { $set: { status: 'completed' } }
      );

      if (inProgressUpdate.modifiedCount > 0 || completedUpdate.modifiedCount > 0) {
        console.log(`✨ Auto-corrected misspelled task statuses in DB: ${inProgressUpdate.modifiedCount} in-progress, ${completedUpdate.modifiedCount} completed.`);
      }
    } catch (migError) {
      console.warn('⚠️ Database auto-heal warning:', migError.message);
    }

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
