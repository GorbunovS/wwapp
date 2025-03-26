import Header from '../src/Header';
import { Outlet } from 'react-router-dom';
import MapLayer from '../src/MapLayer';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MapLayer />} />
        <Route path="/map" element={<MapLayer />} />
      </Routes>
    </>
  )
}

export default App;
