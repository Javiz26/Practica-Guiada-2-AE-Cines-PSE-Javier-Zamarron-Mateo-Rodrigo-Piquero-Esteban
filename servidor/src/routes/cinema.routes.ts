import { Router } from 'express';
import passport from 'passport';
import { fetchCinemas } from '../controllers/cinema.controller';
import { Role } from '../../prisma/generated/prisma';
import { authorize } from '../middleware/role';
import { createCinema } from '../controllers/cinema.controller';
import { updateCinema } from '../controllers/cinema.controller';
import { deleteCinema } from '../controllers/cinema.controller';
const router = Router();


router.post('/cinemas',
    passport.authenticate('jwt', { session: false }),
    fetchCinemas
);

router.post('/cinemas/create',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.ADMIN]),
    createCinema
);
router.put('/cinemas/:id',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.ADMIN]),
    updateCinema
);
router.delete('/cinemas/:id',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.ADMIN]),
    deleteCinema
);


export default router;