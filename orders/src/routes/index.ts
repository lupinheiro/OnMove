import express, { Request, Response } from 'express';
import { requiredAuth, currentUser } from '@mobileorg/common-lib';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', currentUser, requiredAuth, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate('route');
    // Order.collection.drop();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

export { router as indexOrderRouter };
