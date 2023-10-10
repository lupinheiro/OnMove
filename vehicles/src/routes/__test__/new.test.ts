import request from 'supertest';
import { app } from '../../app';
import { Vehicle } from '../../models/vehicle';
import { signin } from '../../test/setup';

jest.mock('../../nats-wrapper');

it('has a route handles listening to /api/vehicles post requests', async () => {
  const response = await request(app).post('/api/vehicles').send({});

  expect(response.status).not.toEqual(404);
});

it('it can be only accessed if user is signed in', async () => {
  await request(app).post('/api/vehicles').send({}).expect(401);
});

it('return a status other than 401 if user is signed in', async () => {
  const cookie = await signin();
  const response = await request(app)
    .post('/api/vehicles')

    .set('Cookie', cookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it('return an error if a invalid type is provided', async () => {
  const cookie = await signin();
  await request(app)
    .post('/api/vehicles')
    .set('Cookie', cookie)
    .send({
      carModel: 'testeModelo',
      capacity: '5',
      type: '',
    })
    .expect(400);

  await request(app)
    .post('/api/vehicles')
    .set('Cookie', cookie)
    .send({
      carModel: 'testeModelo',
      capacity: '5',
    })
    .expect(400);
});
it('creates a vehicle with valid inputs', async () => {
  const cookie = await signin();
  let tickets = await Vehicle.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post('/api/vehicles')
    .set('Cookie', cookie)
    .send({
      carModel: 'testeModelo',
      capacity: '5',
      type: 'asdasf',
    })
    .expect(201);

  tickets = await Vehicle.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].type).toEqual('asdasf');
});

