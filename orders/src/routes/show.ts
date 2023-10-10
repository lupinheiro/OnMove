import express, { Request, Response } from 'express';
import { requiredAuth, NotFoundError, NotAuthorizedError, currentUser, OrderStatus } from '@mobileorg/common-lib';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/routeId/:id', requiredAuth, async (req: Request, res: Response) => {
  try {
    const order = await Order.find({ routeId: req.params.id });

    if (!order) {
      throw new NotFoundError({ details: 'notFound' });
    }

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

router.get('/api/orders/userId', currentUser, requiredAuth, async (req: Request, res: Response) => {
  try {
    const order = await Order.find({ userId: req.currentUser!.id });
    console.log('order', order);
    if (!order) {
      throw new NotFoundError({ details: 'notFound' });
    }

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

router.get('/api/orders/:orderId', requiredAuth, async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new NotFoundError({ details: 'notFound' });
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

export { router as showOrderRouter };
