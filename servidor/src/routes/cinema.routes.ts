import { Router } from 'express';
import { fetchCinemas } from '../controllers/cinema.controller';

const router = Router();
router.post('/cinemas', fetchCinemas);

export default router;