import type { Cinema } from '../types/cinema'

function CineItem({ cinema }: { cinema: Cinema }) {
  return (
    <div style={{ backgroundColor: '#1976d2', color: 'white', padding: '10px', marginBottom: '5px', borderRadius: '4px' }}>
      {cinema.nombre}
    </div>
  )
}

export default CineItem