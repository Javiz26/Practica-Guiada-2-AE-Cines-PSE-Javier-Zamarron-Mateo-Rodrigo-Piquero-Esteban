import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Cinema } from '../types/cinema'

import CinemaItem from './CinesItem'

function CinesList() {
  const [cinemas, setCinemas] = useState<Cinema[]>([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/cinemas', {})
      .then(res => setCinemas(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <ul style={{gap: '10px', listStyle: 'none', padding: 0}}>
      {cinemas.map((cinema: Cinema) => (
        <CinemaItem key={cinema.identificador} cinema={cinema} />
      ))}
    </ul>
  )
}

export default CinesList