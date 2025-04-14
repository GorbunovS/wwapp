import { SimpleForecast, CityWeather } from '../scripts/wheatherData' // Импортируем интерфейсы

// Мокаем данные для города
const mockCityWeather: CityWeather = {
  id: 1,
  name: 'Тестовый город',
  nameEn: 'test-city',
  position: [55.7558, 37.6173],
  currentTemp: '+20°C',
  currentDesc: 'ясно',
  forecast: [
    {
      date: '10.04.2023',
      temp: 20,
      description: 'ясно',
    },
  ],
}

// Мокаем данные прогноза
const mockForecast: SimpleForecast = {
  date: '10.04.2023',
  temp: 20,
  description: 'ясно',
}

describe('Типы данных погоды', () => {
  test('Объект погоды города должен соответствовать интерфейсу CityWeather', () => {
    expect(mockCityWeather).toHaveProperty('id')
    expect(mockCityWeather).toHaveProperty('name')
    expect(mockCityWeather).toHaveProperty('nameEn')
    expect(mockCityWeather).toHaveProperty('position')
    expect(mockCityWeather).toHaveProperty('currentTemp')
    expect(mockCityWeather).toHaveProperty('currentDesc')
    expect(mockCityWeather).toHaveProperty('forecast')

    expect(typeof mockCityWeather.id).toBe('number')
    expect(typeof mockCityWeather.name).toBe('string')
    expect(typeof mockCityWeather.nameEn).toBe('string')
    expect(Array.isArray(mockCityWeather.position)).toBe(true)
    expect(typeof mockCityWeather.currentTemp).toBe('string')
    expect(typeof mockCityWeather.currentDesc).toBe('string')
    expect(Array.isArray(mockCityWeather.forecast)).toBe(true)
  })

  test('Объект прогноза должен соответствовать интерфейсу SimpleForecast', () => {
    expect(mockForecast).toHaveProperty('date')
    expect(mockForecast).toHaveProperty('temp')
    expect(mockForecast).toHaveProperty('description')

    expect(typeof mockForecast.date).toBe('string')
    expect(typeof mockForecast.temp).toBe('number')
    expect(typeof mockForecast.description).toBe('string')
  })

  test('Массив прогнозов в CityWeather должен содержать элементы SimpleForecast', () => {
    const forecastItem = mockCityWeather.forecast[0]
    expect(forecastItem).toHaveProperty('date')
    expect(forecastItem).toHaveProperty('temp')
    expect(forecastItem).toHaveProperty('description')

    expect(typeof forecastItem.date).toBe('string')
    expect(typeof forecastItem.temp).toBe('number')
    expect(typeof forecastItem.description).toBe('string')
  })
})
