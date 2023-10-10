import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../test/setup';

const createVehicle = async () => {
  const cookie = await signin();

  return request(app)
    .post('/api/vehicles')

    .set('Cookie', cookie)
    .send({
      carModel: 'asdsadsad',
      type: 'asfdasf',
      capacity: '5',
    })
    .expect(201);
};

it('can fetch a list of vehicles', async () => {
  await createVehicle();
  await createVehicle();
  await createVehicle();

  const response = await request(app).get('/api/vehicles').send().expect(200);

  expect(response.body.length).toEqual(3);
});

