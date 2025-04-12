import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'
import Header from '../Header'
import CityPageDetail from '../CityPageDetail'
import { getWeatherCondition, getMarkStyleURL } from '../scripts/weather'
import { getForecastData, fetchSimpleWeatherForecast } from '../scripts/wheatherData'
import type { CityWeather } from '../scripts/wheatherData'

// Mock
jest.mock('../MapLayer', () => ({
  MapLayer: jest.fn(() => null),
}))

// Mock
const mockWeatherData: CityWeather[] = [
  {
    id: 1,
    name: 'Москва',
    nameEn: 'moscow',
    position: [55.7558, 37.6173],
    currentTemp: '+20°C',
    currentDesc: 'Ясно',
    forecast: [
      {
        date: '01.01.2024',
        temp: 20,
        description: 'Ясно',
      },
    ],
  },
]

jest.mock('../scripts/wheatherData', () => ({
  getForecastData: jest.fn().mockResolvedValue([
    {
      temp: 20,
      description: 'Ясно',
      time: '12:00',
      date: '1 января',
    },
  ]),
  fetchSimpleWeatherForecast: jest.fn().mockResolvedValue(mockWeatherData),
}))

const mockForecastData = [
  mockWeatherData,
  { ...mockWeatherData, time: '15:00' },
  { ...mockWeatherData, time: '18:00' },
]

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Погода в городах Европы')).toBeInTheDocument()
  })

  it('renders the header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByRole('heading')).toHaveTextContent('Weather Forecast')
  })
})

describe('Header Component', () => {
  test('renders search input', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText('Поиск города...')).toBeInTheDocument()
  })

  test('handles search input change', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    const input = screen.getByPlaceholderText('Поиск города...')
    fireEvent.change(input, { target: { value: 'Москва' } })
    expect(input).toHaveValue('Москва')
  })

  test('shows search history when input is focused', () => {
    localStorage.setItem('searchHistory', JSON.stringify(['Москва', 'Лондон']))
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    const input = screen.getByPlaceholderText('Поиск города...')
    fireEvent.focus(input)
    expect(screen.getByText('История поиска:')).toBeInTheDocument()
  })
})

describe('CityPageDetail Component', () => {
  beforeEach(() => {
    getForecastData.mockResolvedValue(mockForecastData)
  })

  test('renders loading state', () => {
    render(
      <BrowserRouter>
        <CityPageDetail />
      </BrowserRouter>
    )
    expect(screen.getByText('Загрузка')).toBeInTheDocument()
  })

  test('renders forecast data', async () => {
    render(
      <BrowserRouter>
        <CityPageDetail />
      </BrowserRouter>
    )
    const forecastElements = await screen.findAllByText(/ясно/i)
    expect(forecastElements.length).toBeGreaterThan(0)
  })

  test('handles back button click', () => {
    render(
      <BrowserRouter>
        <CityPageDetail />
      </BrowserRouter>
    )
    const backButton = screen.getByText('← Назад')
    expect(backButton).toBeInTheDocument()
  })
})

describe('Weather Utils', () => {
  test('getWeatherCondition returns correct condition', () => {
    expect(getWeatherCondition('ясно')).toBe('sunny')
    expect(getWeatherCondition('дождь')).toBe('rainy')
    expect(getWeatherCondition('облачно')).toBe('cloudy')
    expect(getWeatherCondition('снег')).toBe('snowy')
    expect(getWeatherCondition('туман')).toBe('foggy')
    expect(getWeatherCondition('гроза')).toBe('thunderstorm')
    expect(getWeatherCondition('неизвестно')).toBe('default')
  })

  test('getMarkStyleURL returns correct image URL', () => {
    const url = getMarkStyleURL('ясно')
    expect(url).toBeTruthy()
    expect(typeof url).toBe('string')
  })
})

describe('Weather API', () => {
  beforeEach(() => {
    fetchSimpleWeatherForecast.mockResolvedValue([
      {
        id: 1,
        name: 'Москва',
        nameEn: 'moscow',
        position: [55.7558, 37.6173],
        currentTemp: '+20°C',
        currentDesc: 'ясно',
        forecast: mockForecastData,
      },
    ])
  })

  test('fetchSimpleWeatherForecast returns weather data', async () => {
    const data = await fetchSimpleWeatherForecast()
    expect(data).toHaveLength(1)
    expect(data[0].name).toBe('Москва')
  })

  test('getForecastData returns forecast data', async () => {
    const data = await getForecastData('moscow')
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(3)
  })
})
