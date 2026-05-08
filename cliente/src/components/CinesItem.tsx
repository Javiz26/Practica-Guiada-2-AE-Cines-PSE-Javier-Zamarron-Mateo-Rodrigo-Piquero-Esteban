import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import type { Cinema } from '../types/cinema';
import EditCinema from './EditCinema';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CineItem({ cinema }: { cinema: Cinema }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {cinema.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capacidad: {cinema.capacidad} personas
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        {user?.role === 'CLIENT' ? (
          <Button variant="contained" size="small" fullWidth onClick={() => navigate('/peliculas')}>
            Ver Cartelera
          </Button>
        ) : (
          <EditCinema cinema={cinema} />
        )}
      </CardActions>
    </Card>
  );
}

export default CineItem;