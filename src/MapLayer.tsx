import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { FC } from 'react'
import CardComponent from './CapitalCard'
import { getMarkStyleURL } from './scripts/weather'

type WeatherCondition = 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'foggy' | 'thunderstorm' | 'default'

const center: [number, number] = [55.751244, 37.618423]

const cards = [
  {
    id: 1,
    name: 'Москва',
    position: [55.7558, 37.6173] as [number, number],
    description: 'sunny', 
    temperature: '+15°C',
  },
  {
    id: 2,
    name: 'Санкт-Петербург',
    position: [59.9343, 30.3351] as [number, number],
    description: 'rainy',
    temperature: '+12°C',
  },
]

const MapComponent: FC = () => {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {cards.map((card) => {
          const icon = L.icon({
            iconUrl: getMarkStyleURL(card.description as WeatherCondition),
            iconSize: [60, 60],
            iconAnchor: [20, 40],
            popupAnchor: [0, -35],
          })

          return (
            <Marker key={card.id} position={card.position} icon={icon}>
              <Popup>
                <CardComponent name={card.name} description={card.description} temperature={card.temperature} />
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default MapComponent
