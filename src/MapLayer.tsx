import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { FC } from 'react'
import CardComponent from './CapitalCard' // Переименовал импорт, чтобы избежать конфликта имен

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

const map: FC = () => {
  const center: [number, number] = [55.751244, 37.618423]
  const cards: Card[] = [
    {
      id: 1,
      name: 'Москва',
      position: [55.7558, 37.6173],
      description: 'Столица России',
      temperature: '+15°C',
      image: 'sunny.jpg',
    },
    {
      id: 2,
      name: 'Санкт-Петербург',
      position: [59.9343, 30.3351],
      description: 'Северная столица',
      temperature: '+12°C',
      image: 'sunny.jpg',
    },
  ]

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {cards.map((card) => (
          <Marker key={card.id} position={card.position}>
            <Popup>
              <CardComponent
                name={card.name}
                description={card.description}
                temperature={card.temperature || ''}
                image={card.image || ''}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default map
