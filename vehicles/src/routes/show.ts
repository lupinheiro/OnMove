import { currentUser, NotFoundError } from '@mobileorg/common-lib';
import express, { Request, Response } from 'express';
import { Vehicle } from '../models/vehicle';

const router = express.Router();

router.get('/api/vehicles/me', currentUser, async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.find({ userId: req.currentUser?.id });

    if (!vehicle) {
      throw new NotFoundError({ from: 'show my vehicle ' });
    }

    res.send(vehicle);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

router.get('/api/vehicles/:id', async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      throw new NotFoundError({ from: 'show vehicle ' });
    }
    res.send(vehicle);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
});

export { router as showVehicleRouter };

