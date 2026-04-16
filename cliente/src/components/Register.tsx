import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Button, TextField, Typography, Alert, Paper
} from '@mui/material'
import api from '../middleware/api'

function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validaciones antes de llamar a la API
    if (!email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      await api.post('/auth/register', { email, password })
      navigate('/login') // redirige al login tras registrarse
    } catch (error: any) {
      // Mostramos el mensaje de error que devuelve el backend
      setError(error.response?.data?.error || 'Error al registrarse')
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Crear cuenta
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Registrarse
          </Button>
          <Typography textAlign="center" variant="body2">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default Register