import Header from './Header'
import MapLayer from './MapLayer'
import CityPageDetail from './CityPageDetail'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<MapLayer />} />
        <Route path="city/:cityName" element={<CityPageDetail />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </>
  )
}

export default App
