const API_KEY = 'f69f83d93f2bdce6419d2bf34b0f7934'

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

interface WeatherItem {
  dt: number
  main: {
    temp: number
  }
  weather: Array<{
    description: string
  }>
}

export const EUROPEAN_CAPITALS = [
  { name: 'Москва', nameEn: 'moscow', coords: [55.7558, 37.6173] },
  { name: 'Лондон', nameEn: 'london', coords: [51.5074, -0.1278] },
  { name: 'Париж', nameEn: 'paris', coords: [48.8566, 2.3522] },
  { name: 'Берлин', nameEn: 'berlin', coords: [52.52, 13.405] },
  { name: 'Мадрид', nameEn: 'madrid', coords: [40.4168, -3.7038] },
]

const getCityCoordinates = (cityNameEn: string) => {
  const city = EUROPEAN_CAPITALS.find(
    city => city.nameEn === cityNameEn.toLowerCase()
  )
  
  if (!city) {
    return null
  }

  return {
    lat: city.coords[0],
    lon: city.coords[1],
    name: city.name,
    nameEn: city.nameEn
  }
}

const formatTemp = (temp: number): string => {
  return `${temp > 0 ? '+' : ''}${Math.round(temp)}°C`
}

const fetchWeatherData = async (lat: number, lon: number, cnt: number = 8) => {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru&cnt=${cnt}`

  const [currentRes, forecastRes] = await Promise.all([
    fetch(currentUrl),
    fetch(forecastUrl)
  ])

  const [currentData, forecastData] = await Promise.all([
    currentRes.json(),
    forecastRes.json()
  ])

  return { currentData, forecastData }
}

const processForecastData = (forecastList: WeatherItem[], maxItems: number = 3) => {
  const dailyForecast: SimpleForecast[] = []
  const seenDays = new Set<string>()

  forecastList.forEach((item: WeatherItem) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('ru-RU')
    if (!seenDays.has(date) && dailyForecast.length < maxItems) {
      seenDays.add(date)
      dailyForecast.push({
        date,
        temp: item.main.temp,
        description: item.weather[0].description,
      })
    }
  })

  return dailyForecast
}

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<CityWeather | null> => {
  try {
    const { currentData, forecastData } = await fetchWeatherData(lat, lon)
    const dailyForecast = processForecastData(forecastData.list)

    return {
      id: 0,
      name: currentData.name || 'Местоположение',
      nameEn: currentData.name?.toLowerCase() || '',
      position: [lat, lon] as [number, number],
      currentTemp: formatTemp(currentData.main.temp),
      currentDesc: currentData.weather[0].description,
      forecast: dailyForecast,
    }
  } catch {
    return null
  }
}

export const fetchSimpleWeatherForecast = async (): Promise<CityWeather[]> => {
  try {
    console.log('Загрузка данных о погоде для всех городов...')

    const results = await Promise.all(
      EUROPEAN_CAPITALS.map(async (city, index) => {
        const [lat, lon] = city.coords
        const { currentData, forecastData } = await fetchWeatherData(lat, lon)
        const dailyForecast = processForecastData(forecastData.list)

        return {
          id: index + 1,
          name: city.name,
          nameEn: city.nameEn,
          position: [lat, lon] as [number, number],
          currentTemp: formatTemp(currentData.main.temp),
          currentDesc: currentData.weather[0].description,
          forecast: dailyForecast,
        }
      })
    )

    return results
  } catch {
    return []
  }
}

export const getForecastData = async (cityNameEn: string) => {
  try {
    const cityData = getCityCoordinates(cityNameEn)
    if (!cityData) {
      throw new Error('City not found')
    }

    const { lat, lon } = cityData
    const { forecastData } = await fetchWeatherData(lat, lon, 24)

    return forecastData.list.map((item: any) => ({
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      time: new Date(item.dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      date: new Date(item.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' })
    }))
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    throw error
  }
}
