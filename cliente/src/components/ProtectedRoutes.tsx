import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token, user } = useAuth();

  // Si no hay token o el usuario no está cargado, redirigimos a la página de inicio (Login)
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario existe, le dejamos pasar al contenido, <Outlet /> es donde se renderizarán las páginas protegidas (como CinePage)
  return <Outlet />;
};

export default ProtectedRoute;