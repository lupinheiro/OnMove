import { requiredAuth } from '@mobileorg/common-lib';
import express from 'express';
import { User } from '../models/user';
const router = express.Router();

router.get('/api/users/allUsers', requiredAuth, async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(300).send(error);
  }
});

export { router as allUsersRouter };
