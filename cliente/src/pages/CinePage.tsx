import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CinesList from '../components/CinesList';
import { AppBar, Toolbar, Button, Chip } from '@mui/material';

function CinesPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Chip
              label={user?.role}
              color="default"
              size="small"
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
            />
            <Button
              color="inherit"
              onClick={handleLogout}
              variant="outlined"
              size="small"
              sx={{ borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white' } }}
            >
              Cerrar sesión
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <CinesList />
    </div>
  );
}

export default CinesPage;