import { Routes, Route, Navigate } from 'react-router-dom'
import CinesPage from './pages/CinePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoutes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cines" element={<CinesPage />} />
      </Route>
    </Routes>
  )
}

export default App