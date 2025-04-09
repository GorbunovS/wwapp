import Header from '../src/Header'
import MapLayer from '../src/MapLayer'
import MainPage from '../src/MainPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MapLayer />} />
        <Route path="/map" element={<MapLayer />} />
        <Route path="/weather" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
