import { FC, useState, useEffect } from 'react'
import { fetchWeatherByCoords } from './scripts/wheatherData'
import CardComponent from './CapitalCard'

interface Location {
  latitude: number
  longitude: number
}

interface SimpleForecast {
  date: string;
  temp: number;
  description: string;
}

interface CityWeather {
  id: number;
  name: string;
  position: [number, number];
  currentTemp: string;
  currentDesc: string;
  forecast: SimpleForecast[];
}

const MainPage: FC = () => {
  const [location, setLocation] = useState<Location | null>(null)
  const [weather, setWeather] = useState<CityWeather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation)
        },
        (geoError) => {
          setError('Не удалось получить ваше местоположение')
        }
      )
    } else {
      setError('Геолокация не поддерживается вашим браузером')
    }
  }, [])

  useEffect(() => {
    const getWeather = async () => {
      if (location) {
        setLoading(true)
        try {
          const data = await fetchWeatherByCoords(location.latitude, location.longitude)
          setWeather(data)
        } catch (err) {
          setError('Не удалось загрузить данные о погоде')
        } finally {
          setLoading(false)
        }
      }
    }

    getWeather()
  }, [location])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading && <p>Загрузка данных о погоде...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && weather && (
        <div>
          <h2>Погода в вашем местоположении</h2>
          <CardComponent
            name={weather.name}
            description={weather.currentDesc}
            temperature={weather.currentTemp}
          />
        </div>
      )}
    </div>
  )
}

export default MainPage
