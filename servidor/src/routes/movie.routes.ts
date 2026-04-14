import { Router } from 'express';
import { fetchMovies } from '../controllers/movie.controller';

const router = Router();
router.post('/movies', fetchMovies);

export default router;