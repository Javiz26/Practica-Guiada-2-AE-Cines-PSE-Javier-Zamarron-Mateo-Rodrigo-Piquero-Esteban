import { Routes, Route, Navigate } from 'react-router-dom'
import CinesPage from './pages/CinePage'
import MoviesPage from './pages/MoviesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoutes'
import Layout from './components/Layout'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cines" element={<Layout><CinesPage /></Layout>} />
        <Route path="/peliculas" element={<Layout><MoviesPage /></Layout>} />
        
      </Route>
    </Routes>
  )
}

export default App