import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/setup';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const cookie = await signin();
  await request(app)
    .put(`/api/routes/${id}`)
    .set('Cookie', cookie)
    .send({
      startLocation: {
        details: { lat: 123, lng: 456 },
        name: 'ESS',
      },
      type: '2',
      vehicleId: '1',
      state: 'AVAILABLE',
      endLocation: {
        details: { lat: 789, lng: 101 },
        name: 'End Location Name',
      },
      estimatedTime: '20 minutos',
      description: 'boa',
      startDate: 'Wed Nov 16 2021 17:05:14 GMT+0100 (Hora de verão da Europa Ocidental)',
      rating: 5,
      capacity: 15,
    })
    .expect(404);
});

it('updates the route provided valid inputs', async () => {
  const cookie = await signin();

  const response = await request(app)
    .post('/api/routes')
    .set('Cookie', cookie)
    .send({
      startLocation: {
        details: { lat: 123, lng: 456 },
        name: 'Start Location Name',
      },
      type: 'ESS',
      vehicleId: '60ed58dde9bf430019f5482e',
      state: 'AVAILABLE',
      endLocation: {
        details: { lat: 789, lng: 101 },
        name: 'End Location Name',
      },
      estimatedTime: '20 minutos',
      description: 'boa',
      startDate: 'Wed Nov 16 2021 17:05:14 GMT+0100 (Hora de verão da Europa Ocidental)',
      rating: 5,
      capacity: 15,
    });

  await request(app)
    .put(`/api/routes/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      type: '100',
      availableTime: 'teste',
      state: 'unavailable',
    })
    .expect(201);

  const rideResponse = await request(app).get(`/api/routes/${response.body.id}`).send();

  expect(rideResponse.body.type).toEqual('100');
  expect(rideResponse.body.availableTime).toEqual('teste');
  expect(rideResponse.body.state).toEqual('unavailable');
});

