import { useEffect, useState } from 'react'
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material'
import type { Cinema } from '../types/cinema'
import CineItem from './CinesItem'
import api from '../middleware/api'

function CinesList() {
  const [cines, setCines] = useState<Cinema[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Pedimos la cartelera incluida con withCatalog: true
    api.post('/cinemas', { withCatalog: true })
      .then((res) => {
        const data = res.data.data
        if (data && data.length > 0) {
          setCines(data as Cinema[])
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" fontWeight="800" color="primary.main" gutterBottom>
          Nuestros Cines
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Descubre la cartelera en nuestros cines y no te pierdas ningún estreno.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (!cines || cines.length === 0) ? (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 8 }}>
          No hay cines disponibles en este momento.
        </Typography>
      ) : (
        <Grid container spacing={4} alignItems="stretch">
          {cines.map((cinema: Cinema) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cinema.identificador}>
              <CineItem cinema={cinema} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
export default CinesList