import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import type { Movie } from '../types/movie';
import { useAuth } from '../context/AuthContext';
import PaymentModal from './PaymentModal';

function MovieItem({ movie }: { movie: Movie }) {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {movie.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.reparto}
        </Typography>
      </CardContent>

      {user?.role === 'CLIENT' && (
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button variant="contained" size="small" fullWidth onClick={() => setModalOpen(true)}>
            Comprar entrada
          </Button>
          <PaymentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            movieTitulo={movie.titulo}
          />
        </CardActions>
      )}
    </Card>
  );
}

export default MovieItem;