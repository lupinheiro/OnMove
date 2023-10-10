import {
  requiredAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
  currentUser,
  doRequest,
} from '@mobileorg/common-lib';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { Route } from '../models/route';

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
router.post(
  '/api/orders',
  requiredAuth,
  [
    body('routeId')
      .not()

      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Id must be valid'),
  ],
  currentUser,
  validateRequest,
  async (req: Request, res: Response) => {
    const { routeId } = req.body;
    const route = await Route.findOne({ id: routeId });
    if (!route) {
      throw new NotFoundError({ details: 'New order ' });
    }

    const userOrder = await Order.find({ userId: req.currentUser?.id, routeId: routeId });

    if (userOrder.length > 0) {
      throw new BadRequestError('Already ordered', { details: 'order a ride' });
    }
    const expiration = new Date();

    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      route: route,
      routeId,
    });

    await order.save();

    await doRequest(`http://localhost:3002/api/routes/${order.routeId}`, { decCapacity: true }, 'PUT');

    res.status(201).send(order);
  }
);
router.post(
  '/api/orders/newRoute',

  [
    body('id')
      .not()

      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Id must be valid'),
  ],

  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { id, capacity } = req.body;

      const route = Route.build({ id, capacity });

      await route.save();

      res.status(201).send(route);
    } catch (error) {
      console.log(error);
      res.status(300).send(error);
    }
  }
);

export { router as newOrderRouter };
