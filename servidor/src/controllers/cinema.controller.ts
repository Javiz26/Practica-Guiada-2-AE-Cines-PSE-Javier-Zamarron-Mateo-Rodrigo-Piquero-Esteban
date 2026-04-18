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
export const createCinema = async (req: Request, res: Response): Promise<void> => {
  try {
    const cinemaData = req.body; // Aquí podrías validar con un DTO específico
    const newCinema = await cinemaService.createCinema(cinemaData);

    res.status(201).json({ success: true, data: newCinema });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error al crear el cine", error });
  }
};


export const updateCinema = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ success: false, message: "ID de cine inválido" });
      return;
    }
    const cinemaData = req.body;
    const updatedCinema = await cinemaService.updateCinema(Number(id), cinemaData);

    if (!updatedCinema) {
      res.status(404).json({ success: false, message: "Cine no encontrado" });
      return;
    }
    res.status(200).json({ success: true, data: updatedCinema });
  } catch (error) {
   res.status(400).json({ success: false, message: "Error al actualizar el cine", error: error instanceof Error ? error.message : String(error) });
  }
};

export const deleteCinema = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ success: false, message: "ID de cine inválido" });
      return;
    }
    const deletedCinema = await cinemaService.deleteCinema(Number(id));
    if (!deletedCinema) {
      res.status(404).json({ success: false, message: "Cine no encontrado" });
      return;
    }
    res.status(200).json({ success: true, data: deletedCinema });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error al eliminar el cine", error });
  }
};

