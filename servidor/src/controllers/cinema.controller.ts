import { Request, Response } from 'express';
import { CinemaFilterSchema } from '../dtos/cinema.dto';
import * as cinemaService from '../services/cinema.service';

export const fetchCinemas = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = CinemaFilterSchema.parse(req.body);
    const data = await cinemaService.getFilteredCinemas(filters);
    
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: "Filtros de cine inválidos", error });
  }
};