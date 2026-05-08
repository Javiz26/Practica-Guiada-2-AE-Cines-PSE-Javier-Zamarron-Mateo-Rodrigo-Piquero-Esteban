import { Router } from 'express';
import passport from 'passport';
import { processPayment } from '../controllers/payment.controller';

const router = Router();

router.post(
  '/payments/charge',
  passport.authenticate('jwt', { session: false }),
  processPayment
);

export default router;