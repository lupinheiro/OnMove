import { validateRequest, NotFoundError } from '@mobileorg/common-lib';
import express, { Response, Request } from 'express';
import { Route } from '../models/route';

const router = express.Router();

router.put('/api/routes/:id', validateRequest, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id);
    if (!route) {
      throw new NotFoundError({ from: 'Route not found, verify the route id' });
    }
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
      availableTime,
      actualCapacity,
      decCapacity,
      incCapacity,
    } = req.body;

    if (decCapacity) {
      if (route.actualCapacity - 1 >= 1) {
        route.set({
          actualCapacity: route.actualCapacity - 1,
        });
      }
    } else if (incCapacity) {
      if (route.actualCapacity + 1 <= route.capacity) {
        route.set({
          actualCapacity: route.actualCapacity + 1,
        });
      }
    } else {
      route.set({
        userId: req.currentUser!.id || route.userId,
        type: type || route.type,
        startLocation: startLocation || route.startLocation,
        endLocation: endLocation || route.endLocation,
        availableTime: availableTime || route.availableTime,
        vehicleId: vehicleId || route.vehicleId,
        state: state || route.state,
        description: description || route.description,
        estimatedTime: estimatedTime || route.estimatedTime,
        startDate: startDate || route.startDate,
        userImage: userImage || route.userImage,
        rating: rating || route.rating,
        capacity: capacity || route.capacity,
        actualCapacity: actualCapacity || route.actualCapacity,
      });
    }
    await route.save();

    res.status(201).send(route);
  } catch (error: any) {
    res.status(404).send(error.message); // Send a 404 status and error message
  }
});

export { router as updateRouteRouter };

