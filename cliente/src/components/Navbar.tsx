import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Chip, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseMenu();
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [{ label: 'Cines', path: '/cines' }];

const allLinks = user?.role === 'CLIENT'
  ? navLinks
  : [...navLinks, { label: 'Películas', path: '/peliculas' }];

  return (
    <AppBar position="fixed" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/cines')}
        >
          CinesApp
        </Typography>

        {/* Escritorio */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {allLinks.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              onClick={() => navigate(link.path)}
              sx={{
                fontWeight: isActive(link.path) ? 700 : 400,
                borderBottom: isActive(link.path) ? '2px solid white' : '2px solid transparent',
                borderRadius: 0,
              }}
            >
              {link.label}
            </Button>
          ))}

          {user && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(255,255,255,0.3)' }} />
              <Chip
                label={user.role}
                size="small"
                sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600 }}
              />
              <Button
                color="inherit"
                variant="outlined"
                size="small"
                onClick={handleLogout}
                sx={{ borderColor: 'rgba(255,255,255,0.5)', ml: 1 }}
              >
                Cerrar sesión
              </Button>
            </>
          )}

          {!user && (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Iniciar sesión
            </Button>
          )}
        </Box>

        {/* Móvil */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {allLinks.map((link) => (
              <MenuItem
                key={link.path}
                selected={isActive(link.path)}
                onClick={() => { navigate(link.path); handleCloseMenu(); }}
              >
                {link.label}
              </MenuItem>
            ))}
            <Divider />
            {user ? (
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                Cerrar sesión
              </MenuItem>
            ) : (
              <MenuItem onClick={() => { navigate('/login'); handleCloseMenu(); }}>
                Iniciar sesión
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}