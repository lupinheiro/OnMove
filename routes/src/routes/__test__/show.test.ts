import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { signin } from '../../test/setup';

it('returns 404 if the route is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/routes/${id}`).send().expect(404);
});

it('returns a vehicule if it is found', async () => {
  const location = 'ESS';
  // const type = 'asfdasf';
  // const availableTime = 'teste';
  // const status = 'Available';

  const cookie = await signin();
  const response = await request(app)
    .post('/api/routes')
    .set('Cookie', cookie)
    .send({
      startLocation: {
        details: { lat: 123, lng: 456 },
        name: 'ESS',
      },
      type: '2',
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
    })
    .expect(201);
  const rideResponse = await request(app).get(`/api/routes/${response.body.id}`).send().expect(200);

  expect(rideResponse.body.startLocation.name).toEqual(location);
});

