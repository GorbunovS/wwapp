import { FC, useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getForecastData } from './scripts/wheatherData'
import { getMarkStyleURL } from './scripts/weather'
import './styles/CityPageDetail.css'

interface WeatherData {
  temp: number
  description: string
  time: string
  date: string
}

const CITY_NAMES: { [key: string]: string } = {
  'moscow': 'Москва',
  'london': 'Лондон',
  'paris': 'Париж',
  'berlin': 'Берлин',
  'madrid': 'Мадрид'
}

const CITY_TIMEZONES: { [key: string]: string } = {
  'moscow': 'Europe/Moscow',
  'london': 'Europe/London',
  'paris': 'Europe/Paris',
  'berlin': 'Europe/Berlin',
  'madrid': 'Europe/Madrid'
}

const CityPageDetail: FC = () => {
  const { cityName } = useParams<{ cityName: string }>()
  const navigate = useNavigate()
  const [forecast, setForecast] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)
  const [localTime, setLocalTime] = useState<string>('')
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const loadForecast = async () => {
      if (cityName) {
        setLoading(true)
        try {
          const data = await getForecastData(cityName)
          setForecast(data.slice(1)) // Все прогнозы кроме текущего
          setCurrentWeather(data[0]) // Текущая погода
        } catch (error) {
          console.error('Error loading forecast:', error)
        }
        setLoading(false)
      }
    }

    loadForecast()
  }, [cityName])

  useEffect(() => {
    if (cityName && CITY_TIMEZONES[cityName]) {
      const updateTime = () => {
        const time = new Date().toLocaleTimeString('ru-RU', {
          timeZone: CITY_TIMEZONES[cityName],
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        setLocalTime(time)
      }

      updateTime()
      const interval = setInterval(updateTime, 1000)

      return () => clearInterval(interval)
    }
  }, [cityName])

  if (!cityName || !CITY_NAMES[cityName]) {
    return <Navigate to="" replace />
  }

  if (loading) {
    return <div className="loading">Загрузка</div>
  }

  return (
    <div className="city-page">
      <div className="city-header">
        <div className="header-content">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Назад
          </button>
          <h1>{CITY_NAMES[cityName]}</h1>
          <div className="local-time">
            Местное время: {localTime}
          </div>
        </div>
        <div className="cover-container">
          <img
            src={`${import.meta.env.BASE_URL}images/cities/${cityName}.jpg`}
            alt={`${CITY_NAMES[cityName]} city view`}
            className="city-image"
            onError={(e) => {
              e.currentTarget.src = `${import.meta.env.BASE_URL}images/cities/default.jpg`
              console.log('Failed to load image:', cityName)
            }}
          />
          {currentWeather && (
            <div className="current-weather">
              <img
                src={getMarkStyleURL(currentWeather.description)}
                alt={currentWeather.description}
                className="weather-icon"
              />
              <div className="weather-info">
                <div className="current-temp">{currentWeather.temp}°</div>
                <div className="current-desc">{currentWeather.description}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="forecast-container">
        {forecast.map((weather, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{weather.date}</div>
            <div className="forecast-time">{weather.time}</div>
            <div className="forecast-temp">
              <span className="temp">{weather.temp}°</span>
              <span className="description">{weather.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CityPageDetail
