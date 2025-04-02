import { FC } from 'react'
import { getWeatherCondition, interpretWeatherDescription, getWeatherImage } from '../src/scripts/weather'
import { useNavigate } from 'react-router-dom';

interface CardProps {
    name: string
    description: string
    temperature: string
    image?: string
}

const Card: FC<CardProps> = ({ name, image, description, temperature }) => {
    const weatherCondition = getWeatherCondition(description)
    const weatherDescriptionRu = interpretWeatherDescription(description)
    const backgroundImage = image || getWeatherImage(weatherCondition)
    return (
        <div className="card" style={{
            width: '400px',
            // borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: "'PT Sans Caption', sans-serif",
        }}>
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
            <div className="weather-info" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#fff',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '24px', fontWeight: '900', margin: '0' }}>{temperature}</p>
                    <p style={{ fontSize: '16px', margin: '0', color: '#555' }}>{weatherDescriptionRu}</p>
                </div>
                <button 
                    onClick={() => navigate(`/forecast/${name}`)}
                    style={{
                        background: '#ccc',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}
                >Прогноз</button>
            </div>
        </div>
    )
    }

export default Card
