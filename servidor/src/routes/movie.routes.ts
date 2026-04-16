import { Router } from 'express';
import passport from 'passport';
import { fetchMovies } from '../controllers/movie.controller';
import { fetchCinemas } from '../controllers/cinema.controller';
import { createMovies } from '../controllers/movie.controller';
import { updateMovies } from '../controllers/movie.controller';
import { deleteMovies } from '../controllers/movie.controller';
import { Role } from '../../prisma/generated/prisma';
import { authorize } from '../middleware/role';

const router = Router();

router.post('/movies',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.CINEMA, Role.ADMIN]),
    fetchMovies
);

router.post('/movies/create',
    passport.authenticate('jwt', {session: false}),
    authorize([Role.CINEMA, Role.ADMIN]),
    createMovies
);

router.put('/movies/:id',
    passport.authenticate('jwt', {session: false}),
    authorize([Role.CINEMA, Role.ADMIN]),
    updateMovies
);

router.delete('/movies/:id',
    passport.authenticate('jwt', {session: false}),
    authorize([Role.CINEMA, Role.ADMIN]),
    deleteMovies
);


export default router;