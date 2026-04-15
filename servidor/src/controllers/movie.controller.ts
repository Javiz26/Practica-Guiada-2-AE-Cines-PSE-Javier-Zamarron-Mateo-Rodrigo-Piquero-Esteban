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

export const createMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieData = req.body; // Aquí deberías validar los datos de entrada
    const newMovie = await movieService.createMovie(movieData);
    res.status(201).json({ success: true, data: newMovie });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error al crear la película", error });
  }
};

export const updateMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const movieData = req.body;
    if(!id) {
      res.status(400).json({ success: false, message: "ID de película es requerido" });
      return;
    }
    const updatedMovie = await movieService.updateMovie(Number(id), movieData);
    res.status(200).json({ success: true, data: updatedMovie });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error al actualizar la película", error });
  }
};

export const deleteMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ success: false, message: "ID de película es requerido" });
      return;
    }
    await movieService.deleteMovie(Number(id));
    res.status(200).json({ success: true, message: "Película eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error al eliminar la película", error });
  }
};