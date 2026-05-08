import { Box, Typography } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, pt: '64px' }}>
        {children}
      </Box>
      <Box component="footer" sx={{ backgroundColor: 'primary.main', color: 'white', py: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} CinesApp — Plataformas de Software Empresariales
        </Typography>
      </Box>
    </Box>
  );
}