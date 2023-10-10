import express, { Response, Request } from 'express';
import { Vehicle } from '../models/vehicle';

const router = express.Router();

router.get('/api/vehicles', async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find({});

    res.send(vehicles);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

export { router as indexVehicleRouter };
