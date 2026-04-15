import { Router } from 'express';
import passport from 'passport';
import { fetchMovies } from '../controllers/movie.controller';
import { fetchCinemas } from '../controllers/cinema.controller';
import { Role } from '../../prisma/generated/prisma';
import { authorize } from '../middleware/role';

const router = Router();

router.post('/movies',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.CINEMA, Role.ADMIN]),
    fetchMovies
);

export default router;