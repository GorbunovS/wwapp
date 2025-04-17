import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeatherImage } from '../src/scripts/weather'

interface CardProps {
  name: string
  nameEn: string
  description: string
  temperature: string
  image?: string
}

const Card: FC<CardProps> = ({ name, nameEn, image, description, temperature }) => {
  const navigate = useNavigate()
  const backgroundImage = image || getWeatherImage(description)

  const handleForecastClick = () => {
    console.log('Navigating to:', `city/${nameEn}`)
    navigate(`city/${nameEn}`)
  }

  return (
    <div
      className="card"
      style={{
        width: '400px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: "'PT Sans Caption', sans-serif",
      }}
    >
      <div
        className="card-header"
        style={{
          height: '200px',
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          color: 'white',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ fontSize: '36px', margin: '0', fontWeight: '700' }}>{name}</h2>
      </div>
      <div
        className="weather-info"
        style={{
          display: 'flex',
          color:'rgba(0, 33, 141, 0.8)',
          alignItems: 'center',
          fontWeight:'700',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontSize: '24px', margin: '0' }}>{temperature}</p>
          <p style={{ fontSize: '16px',  fontWeight: '50',margin: '0', color: '#555' }}>{description}</p>
        </div>
        <button
          onClick={handleForecastClick}
          style={{
            background: 'rgba(0, 33, 141, 0.8)',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '0px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5282'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2b6cb0'}
        >
          Прогноз
        </button>
      </div>
    </div>
  )
}

export default Card
