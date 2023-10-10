import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  try {
    req.session = null;

    res.status(200).send({});
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export { router as signoutRouter };

