import { requiredAuth } from '@mobileorg/common-lib';
import express, { Response, Request } from 'express';
import { Route } from '../models/route';

const router = express.Router();

router.get('/api/routes', async (req: Request, res: Response) => {
  try {
    const route = await Route.find({});
    res.status(200).send(route);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

router.get('/api/routes/user', requiredAuth, async (req: Request, res: Response) => {
  try {
    const route = await Route.find({ userId: req.currentUser!.id });
    res.status(200).send(route);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

router.get('/api/routes/user/:id', requiredAuth, async (req: Request, res: Response) => {
  try {
    const route = await Route.find({ userId: req.params.id });
    res.status(200).send(route);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

export { router as indexRouteRouter };

