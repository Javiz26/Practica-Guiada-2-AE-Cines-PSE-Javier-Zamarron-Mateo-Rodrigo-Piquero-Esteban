import { Request, Response } from 'express';
import { MovieFilterSchema } from '../dtos/movie.dto';
import * as movieService from '../services/movie.service';

export const fetchMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = MovieFilterSchema.parse(req.body);
    const data = await movieService.getFilteredMovies(filters);
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Filtros de película inválidos", error });
  }
};