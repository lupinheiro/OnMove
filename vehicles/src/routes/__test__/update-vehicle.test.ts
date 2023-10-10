import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/setup';

it('returns a 404 if the provided id does not exist', async () => {
  const cookie = await signin();

  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/vehicles/${id}`)
    .set('Cookie', cookie)
    .send({
      carModel: 'testeModelo',
      capacity: '5',
      type: 'volvo',
    })
    .expect(404);
});

it('returns a 400 if the user provides an invalid type', async () => {
  const cookie = await signin();

  const response = await request(app).post('/api/vehicles').set('Cookie', cookie).send({
    carModel: 'testeModelo',
    capacity: '5',
    type: 'volvo',
  });

  await request(app)
    .put(`/api/vehicles/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      carModel: 'testeModelo',
      capacity: '5',
      type: '',
    })
    .expect(400);

  await request(app)
    .put(`/api/vehicles/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      location: 'alskdfjj',
      type: '',
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const cookie = await signin();

  const response = await request(app).post('/api/vehicles').set('Cookie', cookie).send({
    carModel: 'testeModelo',
    capacity: '5',
    type: 'volvo',
  });

  await request(app)
    .put(`/api/vehicles/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      carModel: 'testeModelo2',
      capacity: '5',
      type: 'bmw',
    })
    .expect(201);

  const vehicleResponse = await request(app).get(`/api/vehicles/${response.body.id}`).send();

  expect(vehicleResponse.body.carModel).toEqual('testeModelo2');
  expect(vehicleResponse.body.type).toEqual('bmw');
});

