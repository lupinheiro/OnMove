import express, { Request, Response } from 'express';
import { doRequest, NotFoundError, NotAuthorizedError, OrderStatus } from '@mobileorg/common-lib';
import { Order } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    console.log('second');
    const order = await Order.findById(orderId).populate('route');

    if (!order) {
      throw new NotFoundError({ details: 'error' });
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    await doRequest(`http://localhost:3002/api/routes/${order.routeId}`, { incCapacity: true }, 'PUT');

    res.status(204).send(order);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

export { router as deleteOrderRouter };
