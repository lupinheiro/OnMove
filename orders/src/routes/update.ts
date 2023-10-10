import { requiredAuth, validateRequest, NotFoundError, OrderStatus } from '@mobileorg/common-lib';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Order } from '../models/order';
// import { Route } from '../../../routes/src/models/route';

const router = express.Router();

router.post(
  '/api/orders/cancelled',
  requiredAuth,
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
      const { id, status } = req.body;

      const order = await Order.findById(id);
      if (!order) {
        throw new NotFoundError({ details: 'New order ' });
      }
      // const isReserved = await ticket.isReserved();
      // if (isReserved) {
      //     throw new BadRequestError('Already reserved', { details: 'order a ride' });
      // }

      order.set({
        status: OrderStatus.Cancelled,
      });

      await order.save();

      // const route = await Route.findById(order.route.id);
      // if (route) {
      //   route.set({ actualCapacity: route.actualCapacity + 1 });
      //   await route.save();
      // }
      res.status(201).send(order);
    } catch (error) {
      console.log(error);
      res.status(300).send(error);
    }
  }
);

router.post(
  '/api/orders/accepted',
  requiredAuth,
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
      const { id } = req.body;

      const order = await Order.findById(id);
      if (!order) {
        throw new NotFoundError({ details: 'New order ' });
      }
      // const isReserved = await ticket.isReserved();
      // if (isReserved) {
      //     throw new BadRequestError('Already reserved', { details: 'order a ride' });
      // }

      order.set({
        status: OrderStatus.Accepted,
      });

      await order.save();

      // new OrderCancelledPublisher(natsWrapper.client).publish({
      //     id: order.id,
      //     ticket: {
      //         id: order.routeId,
      //     },
      // });

      // const route = await Route.findById(order.route.id);
      // if (route) {
      //   route.set({ actualCapacity: route.actualCapacity - 1 });
      //   await route.save();
      // }
      res.status(201).send(order);
    } catch (error) {
      console.log(error);
      res.status(300).send(error);
    }
  }
);

router.post(
  '/api/orders/finish',
  requiredAuth,
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
      const { id } = req.body;

      const order = await Order.find({ routeId: id });
      console.log(order);
      if (!order) {
        throw new NotFoundError({ details: 'New order ' });
      }
      // const isReserved = await ticket.isReserved();
      // if (isReserved) {
      //     throw new BadRequestError('Already reserved', { details: 'order a ride' });
      // }

      order.forEach(async (item) => {
        item.set({ status: OrderStatus.Complete });
        //   new OrderFinishPublisher(natsWrapper.client).publish({
        //     id: item.id,
        //     route: {
        //       id: item.routeId,
        //     },
        //   });
        // const routes = await Route.findById(item.routeId);
        // if (routes) {
        //   routes.set({ actualCapacity: routes.capacity });
        //   await routes.save();
        // }
        // await item.save();
      });

      res.status(201).send(order);
    } catch (error) {
      console.log(error);
      res.status(300).send(error);
    }
  }
);

export { router as updateOrderRouter };
