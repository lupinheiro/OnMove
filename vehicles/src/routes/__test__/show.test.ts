import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/setup';

it('returns 404 if the vehicle is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/vehicles/${id}`).send().expect(404);
});

it('returns a vehicule if it is found', async () => {
  const cookie = await signin();
  const carModel = 'asdsadsad';
  const type = 'asfdasf';
  const capacity = '5';
  const response = await request(app)
    .post('/api/vehicles')
    .set('Cookie', cookie)
    .send({
      carModel,
      type,
      capacity,
    })
    .expect(201);

  const vehicleResponse = await request(app).get(`/api/vehicles/${response.body.id}`).send().expect(200);
});

