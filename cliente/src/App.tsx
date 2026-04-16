import { Routes, Route } from 'react-router-dom'
import CinesPage from './pages/CinePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/cines" element={<CinesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
