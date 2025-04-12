import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { FC, useEffect, useState } from 'react'
import CardComponent from './CapitalCard'
import { getMarkStyleURL } from './scripts/weather'
import { fetchSimpleWeatherForecast } from '../src/scripts/wheatherData'

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface SimpleForecast {
  date: string
  temp: number
  description: string
}

interface CityWeather {
  id: number
  name: string
  nameEn: string
  position: [number, number]
  currentTemp: string
  currentDesc: string
  forecast: SimpleForecast[]
}

const center: [number, number] = [55.751244, 37.618423]

const MapComponent: FC = () => {
  const [cards, setCards] = useState<CityWeather[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true)
        const data = await fetchSimpleWeatherForecast()
        setCards(data)
      } catch {
        setError('не удалось загрузить погоду')
      } finally {
        setLoading(false)
      }
    }

    loadWeatherData()
  }, [])

  if (loading) return <div className="loading">Загрузка данных о погоде...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=g7cM1vMR1viO2I3YInIA"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          maxZoom={20}
        />

        {cards.map((card) => {
          const iconUrl = getMarkStyleURL(card.currentDesc)

          const icon = L.icon({
            iconUrl: iconUrl,
            iconSize: [60, 60],
            iconAnchor: [20, 40],
            popupAnchor: [0, -35],
          })

          return (
            <Marker key={card.id} position={card.position} icon={icon}>
              <Popup maxHeight={1000} maxWidth={1000} closeButton={false}>
                <CardComponent
                  name={card.name}
                  nameEn={card.nameEn}
                  description={card.currentDesc}
                  temperature={card.currentTemp}
                />
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default MapComponent
