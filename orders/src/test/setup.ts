import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'gdhgdhgd';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

export const signin = () => {
  // Build a JWT payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'teste@teste.com',
  };
  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build a session object
  const session = { jwt: token };
  // Return session as JSON
  const sessionJSON = JSON.stringify(session);
  // Encode JSON to base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // Return the string
  return [`express:sess=${base64}`];
};

