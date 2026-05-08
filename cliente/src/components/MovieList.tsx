import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import type { Movie } from '../types/movie';
import MovieItem from './MovieItem';
import api from '../middleware/api';

function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.post('/movies', {})
      .then((res) => {
        const data = res.data.data;
        if (data && data.length > 0) {
          setMovies(data as Movie[]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="800" color="primary.main" gutterBottom>
          Películas
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Descubre todas las películas disponibles en cartelera.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (!movies || movies.length === 0) ? (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 8 }}>
          No hay películas disponibles.
        </Typography>
      ) : (
        <Grid container spacing={4} alignItems="stretch">
          {movies.map((movie) => (
            <Grid key={movie.identificador} size={{ xs: 12, sm: 6, md: 4 }}>
              <MovieItem movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MoviesList;