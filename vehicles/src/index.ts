import mongoose from 'mongoose';
import { app } from './app';
import 'dotenv/config';
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongo DB');
  } catch (err) {
    console.error(`Error on start ${err}`);
  }
  app.listen(process.env.PORT, () => {
    console.log(`Listening port ${process.env.PORT}!!!!!!!!`);
  });
};

start();
