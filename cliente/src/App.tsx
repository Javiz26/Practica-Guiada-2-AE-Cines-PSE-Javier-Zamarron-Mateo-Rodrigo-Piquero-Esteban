import { Routes, Route } from 'react-router-dom'
import CinesPage from './pages/CinePage'

function App() {
  return (
    <Routes>
      <Route path="/cines" element={<CinesPage />} />
      <Route path="/" element={<CinesPage />} />
    </Routes>
  )
}

export default App
