import type { Cinema } from '../types/cinema'
import { useAuth } from '../context/AuthContext';

function CineItem({ cinema }: { cinema: Cinema }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

return (
    <>
      <div style={{ backgroundColor: '#1976d2', color: 'white', padding: '10px', marginBottom: '5px', borderRadius: '4px' }}>
        {cinema.nombre}
      </div>
      <div>
        {isAdmin && (
          <button 
            style={{ backgroundColor: 'orange', color: 'white', border: 'none' }}>
            Editar Cine 
          </button>
        )}
      </div>
    </>
  );
};

export default CineItem