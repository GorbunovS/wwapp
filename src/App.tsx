import Header from './Header'
import MapLayer from './MapLayer'
import CityPageDetail from './CityPageDetail'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      <Routes>
        <Route path="/" element={<MapLayer />} />
        <Route path="/city/:cityName" element={<CityPageDetail />} />
      </Routes>
    </div>
  )
}

export default App
