import { FC } from 'react'
import { getWeatherCondition, getWeatherImage } from '../src/scripts/weather'

interface CardProps {
  name: string
  description: string
  temperature: string
  image?: string
}

const Card: FC<CardProps> = ({ name, image, description, temperature }) => {
  const weatherCondition = getWeatherCondition(description)
  const backgroundImage = image || getWeatherImage(weatherCondition)

  return (
    <div className="card">
      <div
        className="card-header"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="header-content">
          <h2 className="city-name">{name}</h2>
        </div>
      </div>
      <div className="weather-info">
        <p className="temperature">{temperature}</p>
        <p className="weather-condition">{getWeatherCondition(description)}</p>
      </div>
    </div>
  )
}

export default Card
