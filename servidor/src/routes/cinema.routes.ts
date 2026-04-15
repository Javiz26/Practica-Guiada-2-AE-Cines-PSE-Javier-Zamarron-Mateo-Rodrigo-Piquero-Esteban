import { Router } from 'express';
import passport from 'passport';
import { fetchCinemas } from '../controllers/cinema.controller';
import { Role } from '../../prisma/generated/prisma';
import { authorize } from '../middleware/role';

const router = Router();

router.post('/cinemas',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.CINEMA, Role.ADMIN]),
    fetchCinemas
);
router.post('')

export default router;