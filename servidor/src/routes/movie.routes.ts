import { Router } from 'express';
import passport from 'passport';
import { Role } from '../../prisma/generated/prisma';
import { authorize } from '../middleware/role';
import { fetchMovies, createMovies, updateMovies, deleteMovies } from '../controllers/movie.controller';

const router = Router();

/**
 * @openapi
 * /api/movies:
 *   post:
 *     summary: Obtener lista de películas
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas
 */
router.post('/movies',
  passport.authenticate('jwt', { session: false }),
  authorize([Role.CINEMA, Role.ADMIN, Role.CLIENT]),
  fetchMovies
);

/**
 * @openapi
 * /api/movies/create:
 *   post:
 *     summary: Crear una película (solo ADMIN)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Película creada
 */
router.post('/movies/create',
  passport.authenticate('jwt', { session: false }),
  authorize([Role.ADMIN]),
  createMovies
);

/**
 * @openapi
 * /api/movies/{id}:
 *   put:
 *     summary: Actualizar una película (solo ADMIN)
 *     tags: [Movies]
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
 *         description: Película actualizada
 *   delete:
 *     summary: Eliminar una película (solo ADMIN)
 *     tags: [Movies]
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
 *         description: Película eliminada
 */
router.put('/movies/:id',
  passport.authenticate('jwt', { session: false }),
  authorize([Role.ADMIN]),
  updateMovies
);

router.delete('/movies/:id',
  passport.authenticate('jwt', { session: false }),
  authorize([Role.ADMIN]),
  deleteMovies
);

export default router;