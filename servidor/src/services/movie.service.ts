import prisma from '../libs/prisma'; 
import { MovieFilterDTO } from '../dtos/movie.dto';

export const getFilteredMovies = async (filters: MovieFilterDTO) => {
  // 1. Empezamos con una consulta vacía
  const where: any = {};

  // 2. Filtro por ID
  if (filters.id) {
    where.id = filters.id;
  }

  // 3. Filtro por Actores (Si mandan varios, la peli debe tenerlos a TODOS)
  if (filters.cast && filters.cast.length > 0) {
    where.AND = filters.cast.map(actor => ({
      actors: { contains: actor, mode: 'insensitive' }
    }));
  }

  // 4. Filtro por Fechas (Cruzamos con la tabla show_timing)
  if (filters.sessionBefore || filters.sessionAfter) {
    where.show_timing = { some: { day: {} } };
    
    if (filters.sessionBefore) {
      where.show_timing.some.day.lt = filters.sessionBefore;
    }
    if (filters.sessionAfter) {
      where.show_timing.some.day.gt = filters.sessionAfter;
    }
  }

  // Ejecutamos la consulta en la BD usando tu archivo prisma personalizado
  const movies = await prisma.movie.findMany({
    where: where
  });

  // Devolvemos los datos mapeados limpios
  return movies.map((movie: any) => ({
    identificador: movie.id,
    titulo: movie.name,
    reparto: movie.actors
  }));
};

export const createMovie = async (movieData: any) => {
  const newMovie = await prisma.movie.create({
    data: {
      name: movieData.nombre,
      actors: movieData.actor
    }
  });
  return newMovie;
};

export const updateMovie = async (id: number, movieData: any) => {
  const updatedMovie = await prisma.movie.update({
    where: { id },
    data: { name: movieData.nombre, actors: movieData.actor }
  });
  return updatedMovie;
};

export const deleteMovie = async (id: number) => {
  await prisma.movie.delete({
    where: { id }
  });
};
