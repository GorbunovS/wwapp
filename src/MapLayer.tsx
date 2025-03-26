import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { FC } from 'react'

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

interface CityMarker {
  id: number
  name: string
  position: [number, number]
  description: string
}

const RussiaMap: FC = () => {
  const center: [number, number] = [55.751244, 37.618423]
  const markers: CityMarker[] = [
    {
      id: 1,
      name: 'Москва',
      position: [55.7558, 37.6173],
      description: 'Столица России',
    },
    {
      id: 2,
      name: 'Санкт-Петербург',
      position: [59.9343, 30.3351],
      description: 'Северная столица',
    },
  ]

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://tile.udev.su/styles/basemap/512/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              <h3>{marker.name}</h3>
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default RussiaMap
