import { requiredAuth, validateRequest, NotAuthorizedError, NotFoundError } from '@mobileorg/common-lib';
import express, { Response, Request, request } from 'express';
import { body } from 'express-validator';
import { VehiculeUpdatedPublisher } from '../events/publishers/vehicle-updated-publisher';
import { Vehicle } from '../models/vehicle';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/vehicles/:id',
  requiredAuth,
  [
    body('carModel').not().isEmpty().withMessage('location is required'),
    body('type').not().isEmpty().withMessage('type is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) {
        throw new NotFoundError({ from: 'Update vehicle' });
      }

      if (vehicle.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
      }
      vehicle.set({
        carModel: req.body.carModel,
        type: req.body.type,
        capacity: req.body.capacity,
      });
      await vehicle.save();
      // new VehiculeUpdatedPublisher(natsWrapper.client).publish({
      //     id: vehicle.id,
      //     carModel: vehicle.carModel,
      //     type: vehicle.type,
      //     userId: vehicle.userId

      // })

      res.status(201).send(vehicle);
    } catch (error: any) {
      res.status(404).send(error.message);
    }
  }
);

export { router as updateVehicleRouter };

