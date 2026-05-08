import { Router } from 'express';
import passport from 'passport';
import { fetchCinemas } from '../controllers/cinema.controller';
import { Role } from '../../prisma/generated/prisma';
import { authorize } from '../middleware/role';
import { createCinema } from '../controllers/cinema.controller';
import { updateCinema } from '../controllers/cinema.controller';
import { deleteCinema } from '../controllers/cinema.controller';
const router = Router();

/**
 * @openapi
 * /api/cinemas:
 *   post:
 *     summary: Obtener lista de cines
 *     tags: [Cinemas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cines
 */
router.post('/cinemas',
    passport.authenticate('jwt', { session: false }),
    fetchCinemas
);


/**
 * @openapi
 * /api/cinemas/create:
 *   post:
 *     summary: Crear un cine (solo ADMIN)
 *     tags: [Cinemas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Cine creado
 */
router.post('/cinemas/create',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.ADMIN]),
    createCinema
);
/**
 * @openapi
 * /api/cinemas/{id}:
 *   put:
 *     summary: Actualizar un cine (solo ADMIN)
 *     tags: [Cinemas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cine actualizado
 *   delete:
 *     summary: Eliminar un cine (solo ADMIN)
 *     tags: [Cinemas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cine eliminado
 */
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