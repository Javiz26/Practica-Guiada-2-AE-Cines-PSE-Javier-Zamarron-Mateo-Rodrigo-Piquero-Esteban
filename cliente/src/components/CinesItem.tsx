import type { Cinema } from '../types/cinema'
import EditCinema from './EditCinema';

function CineItem({ cinema }: { cinema: Cinema }) {
  
return (
    <>
      <div style={{ backgroundColor: '#1976d2', color: 'white', padding: '10px', marginBottom: '5px', borderRadius: '4px' }}>
        {cinema.nombre}
      </div>
      <EditCinema cinema={cinema} />
    </>
  );
};

export default CineItem