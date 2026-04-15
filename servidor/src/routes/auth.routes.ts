import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth.controller'; // ← cambio 1: AuthController
import { authorize } from '../middleware/role';
import { Role } from '../../prisma/generated/prisma'; // ← cambio 2: no '@prisma/client'

const router = Router();

// ---- RUTAS PÚBLICAS ----
router.post('/register', AuthController.register); // ← AuthController.register, no solo register
router.post('/login', AuthController.login);       // ← AuthController.login, no solo login

// ---- RUTAS PROTEGIDAS ----

// 1. Cualquier usuario logueado puede ver su perfil
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => res.json(req.user)
);

// 2. Solo CINEMA y ADMIN pueden publicar contenido
router.post('/publish',
    passport.authenticate('jwt', { session: false }),
    authorize([Role.CINEMA, Role.ADMIN]),
    (req, res) => res.json({ message: "Post publicado" })
);

export default router;