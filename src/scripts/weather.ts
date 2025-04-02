import sunnyImage from '../assets/marks/sunny.png'
import rainyImage from '../assets/marks/rainy.png'
import cloudyImage from '../assets/marks/cloudy.png'
import snowyImage from '../assets/marks/snowy.png'
import foggyImage from '../assets/marks/foggy.png'
import thunderstormImage from '../assets/marks/thunderstorm.png'

import sunnyImageCover from '../assets/weather/sunny.png'
import rainyImageCover from '../assets/weather/rainy.png'
import cloudyImageCover from '../assets/weather/cloudy.png'
import snowyImageCover from '../assets/weather/snowy.png'
import foggyImageCover from '../assets/weather/foggy.png'
import thunderstormImageCover from '../assets/weather/thunderstorm.png'

export type WeatherCondition =
  | 'sunny'
  | 'rainy'
  | 'cloudy'
  | 'snowy'
  | 'foggy'
  | 'thunderstorm'
  | 'default'

const weatherDescriptions: Record<string, WeatherCondition> = {
  sunny: 'sunny',
  солнце: 'sunny',
  rain: 'rainy',
  дождь: 'rainy',
  cloudy: 'cloudy',
  облачно: 'cloudy',
  snow: 'snowy',
  снег: 'snowy',
  fog: 'foggy',
  туман: 'foggy',
  thunder: 'thunderstorm',
  гроза: 'thunderstorm',
}

export const getWeatherCondition = (description: string): WeatherCondition => {
  const desc = description.toLowerCase()

  for (const [key, value] of Object.entries(weatherDescriptions)) {
    if (desc.includes(key)) {
      return value
    }
  }

  return 'default'
}

export const getMarkStyleURL = (description: string): string => {
  const condition = getWeatherCondition(description)

  const imageMap: Record<WeatherCondition, string> = {
    sunny: sunnyImage,
    rainy: rainyImage,
    cloudy: cloudyImage,
    snowy: snowyImage,
    foggy: foggyImage,
    thunderstorm: thunderstormImage,
  }

  return imageMap[condition] || imageMap.default
}

export const getWeatherImage = (description: string): string => {
  const condition = getWeatherCondition(description)

  const imageMap: Record<WeatherCondition, string> = {
    sunny: sunnyImageCover,
    rainy: rainyImageCover,
    cloudy: cloudyImageCover,
    snowy: snowyImage,
    foggy: foggyImage,
    thunderstorm: thunderstormImage,
  }

  return imageMap[condition] || imageMap.default
}

export const interpretWeatherDescription = (condition: WeatherCondition): string => {
  const descriptionMap: Record<WeatherCondition, string> = {
    sunny: 'Солнечно',
    rainy: 'Дождливо',
    cloudy: 'Облачно',
    snowy: 'Снежно',
    foggy: 'Туманно',
    thunderstorm: 'Гроза',
    default: 'Неизвестно',
  }

  return descriptionMap[condition] || descriptionMap.default
}
