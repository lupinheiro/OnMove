import request from 'supertest';
import { app } from '../../app';
import { Route } from '../../models/route';
import { signin } from '../../test/setup';

it('has a route handles listening to /api/routes post requests', async () => {
  const response = await request(app).post('/api/routes').send({});

  expect(response.status).not.toEqual(404);
});

it('it can be only accessed if user is signed in', async () => {
  await request(app).post('/api/routes').send({}).expect(401);
});

it('return a status other than 401 if user is signed in', async () => {
  const cookie = await signin();
  const response = await request(app).post('/api/routes').set('Cookie', cookie).send({});

  expect(response.status).not.toEqual(401);
});

it('return an error if a invalid userId is provided', async () => {
  const cookie = await signin();
  await request(app)
    .post('/api/routes')
    .set('Cookie', cookie)
    .send({
      location: '',
      type: 'asdf',
    })
    .expect(400);

  await request(app)
    .post('/api/routes')
    .set('Cookie', cookie)
    .send({
      type: 'fdsfsdf',
    })
    .expect(400);
});
it('return an error if a invalid type is provided', async () => {
  const cookie = await signin();
  await request(app)
    .post('/api/routes')
    .set('Cookie', cookie)
    .send({
      location: 'dsf2354324',
      type: '',
    })
    .expect(400);

  await request(app)
    .post('/api/routes')
    .set('Cookie', cookie)
    .send({
      location: 'dsf2354324',
    })
    .expect(400);
});
it('creates a ride with valid inputs', async () => {
  const cookie = await signin();
  let tickets = await Route.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
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
    })
    .expect(201);

  tickets = await Route.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].type).toEqual('ESS');
});

// import request from 'supertest';
// import express from 'express';
// import { validationResult } from 'express-validator';
// import { createRouteRouter } from '../new'; // Replace with the actual path to your routes file
// import { Route } from '../../models/route';

// const app = express();
// app.use(express.json());
// app.use(createRouteRouter);

// // Mock authentication function for testing
// function mockAuthentication() {
//   const mockUserId = '6298f4bbaf114adb39eb8560';
//   const mockToken =
//     'eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall5T1RobU5HSmlZV1l4TVRSaFpHSXpPV1ZpT0RVMk1DSXNJbVZ0WVdsc0lqb2liMnhoUUc5c1lTNXdkQ0lzSW5KaGRHbHVaeUk2TUN3aWFXRjBJam94TmprMk1qa3dPREExZlEuTnFoRUNBWXRPLXhkNXpTOGJRVloyMWE3YXFqaHJGS2tHcWJhV2xoWG5rQSJ9';

//   // Simulate authentication by returning a mock token and user ID
//   return { userId: mockUserId, token: mockToken };
// }

// describe('POST /api/routes', () => {
//   it('should create a new route with valid input', async () => {
//     const routeData = {
//       startLocation: {
//         details: { lat: 123, lng: 456 },
//         name: 'Start Location Name',
//       },
//       type: 'Route Type',
//       vehicleId: 'Vehicle ID',
//       endLocation: {
//         details: { lat: 789, lng: 101 },
//         name: 'End Location Name',
//       },
//       estimatedTime: '20 minutes',
//       description: 'Route Description',
//       startDate: '2023-10-02T12:00:00Z',
//     };

//     const { token } = mockAuthentication();

//     console.log(routeData);

//     const response = await request(app).post('/api/routes').set('Authorization', `Bearer ${token}`).send(routeData);

//     // Check if the route was created successfully
//     expect(response.status).toBe(201);

//     // Validate the response body
//     expect(response.body).toHaveProperty('userId');
//     expect(response.body).toHaveProperty('type', routeData.type);
//     // Add more assertions as needed to validate the response body

//     // Check if the route was saved in the database
//     const routes = await Route.find({});
//     expect(routes.length).toBe(1);
//   });

//   it('should return an error with invalid input', async () => {
//     const invalidRouteData = {
//       // Missing required fields
//       // For example, startLocation is missing
//       type: 'Route Type',
//       vehicleId: 'Vehicle ID',
//       endLocation: {
//         details: { lat: 789, lng: 101 },
//         name: 'End Location Name',
//       },
//       estimatedTime: '20 minutes',
//       description: 'Route Description',
//       startDate: '2023-10-02T12:00:00Z',
//     };

//     const response = await request(app).post('/api/routes').send(invalidRouteData);

//     // Check if the request was rejected with a 400 status code
//     expect(response.status).toBe(400);

//     // Check if the response body contains validation errors
//     const errors = validationResult(response);
//     expect(errors.isEmpty()).toBe(false);

//     // Check if the route was not saved in the database
//     const routes = await Route.find({});
//     expect(routes.length).toBe(0);
//   });
// });

