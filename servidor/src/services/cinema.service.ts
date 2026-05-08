import prisma from '../libs/prisma'; 
import { CinemaFilterDTO } from '../dtos/cinema.dto';

export const getFilteredCinemas = async (filters: CinemaFilterDTO) => {
  const where: any = {};

  if (filters.id) {
    where.id = filters.id;
  }

  // Unificamos withMovie y byMovies en una sola lista de IDs para buscar fácil
  const movieIds: number[] = filters.byMovies ? [...filters.byMovies] : [];
  if (filters.withMovie) {
    movieIds.push(filters.withMovie);
  }

  // Filtros relacionales (Películas y Fechas)
  if (movieIds.length > 0 || filters.sessionBefore || filters.sessionAfter) {
    where.show_timing = { some: {} };
    
    if (movieIds.length > 0) {
      where.show_timing.some.movie_id = { in: movieIds };
    }

    if (filters.sessionBefore || filters.sessionAfter) {
      where.show_timing.some.day = {};
      if (filters.sessionBefore) where.show_timing.some.day.lt = filters.sessionBefore;
      if (filters.sessionAfter)  where.show_timing.some.day.gt = filters.sessionAfter;
    }
  }

  // Si piden el catálogo, le decimos a Prisma que lo traiga incluido
  const include: any = {};
  if (filters.withCatalog) {
    include.show_timing = {
      include: {
        movie: true // Trae también la info de la película
      }
    };
  }

  const theaters = await prisma.theater.findMany({
    where: where,
    include: filters.withCatalog ? include : undefined
  } as any);

  return theaters.map((cine: any) => {
    // Mapeo básico del cine
    const resultado: any = {
      identificador: cine.id,
      nombre: cine.name,
      capacidad: cine.capacity
    };

    // Si pidieron catálogo y el cine tiene sesiones
    if (filters.withCatalog && cine.show_timing) {
      resultado.cartelera = cine.show_timing.map((st: any) => ({
        fecha: st.day,
        pelicula: st.movie ? st.movie.name : 'Desconocida'
      }));
    }

    return resultado;
  });
};

export const createCinema = async (cinemaData: any) => {
  const newCinema = await prisma.theater.create({
    data: {
      name: cinemaData.nombre,
      capacity: cinemaData.capacidad}
  });
  return { newCinema };
};

export const updateCinema = async (id: number, cinemaData: any) => {
  const updatedCinema = await prisma.theater.update({
    where: { id },
    data: { name: cinemaData.nombre, capacity: cinemaData.capacidad }
  });
  return { updatedCinema };
};

export const deleteCinema = async (id: number) => {
  const deletedCinema = await prisma.theater.delete({
    where: { id }
  });
  return { deletedCinema };
};