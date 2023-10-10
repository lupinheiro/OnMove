import { requiredAuth, validateRequest, doRequest } from '@mobileorg/common-lib';
import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import { Route } from '../models/route';

const router = express.Router();

router.post(
  '/api/routes',
  requiredAuth,
  [
    body('startLocation').not().isEmpty().withMessage('start location required'),
    body('type').not().isEmpty().withMessage('type required'),
    body('vehicleId').not().isEmpty().withMessage('vehicle required'),
    body('endLocation').not().isEmpty().withMessage('end point is required'),
    body('description').not().isEmpty().withMessage('description is required'),
    body('startDate').not().isEmpty().withMessage('starting date is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const {
        startLocation,
        type,
        vehicleId,
        state,
        endLocation,
        estimatedTime,
        userImage,
        description,
        startDate,
        rating,
        capacity,
      } = req.body;

      const route = Route.build({
        userId: req.currentUser!.id,
        type,
        startLocation: {
          lat: startLocation.details.lat,
          lng: startLocation.details.lng,
          name: startLocation.name,
        },
        endLocation: {
          lat: endLocation.details.lat,
          lng: endLocation.details.lng,
          name: endLocation.name,
        },
        availableTime: 'teste',
        vehicleId,
        state: state || 'unavailable',
        description,
        estimatedTime,
        startDate,
        userImage: userImage || '',
        rating: rating || 0,
        capacity: capacity || 0,
        actualCapacity: capacity || 0,
      });
      await route.save();

      await doRequest(
        `http://smob.esce.ipvc.pt:3002/api/order/newRoute`,
        { id: route.id, capacity: route.capacity },
        'POST'
      );

      res.status(201).send(route);
    } catch (error) {
      console.log(error);
      res.status(300).send(error);
    }
  }
);

export { router as createRouteRouter };

