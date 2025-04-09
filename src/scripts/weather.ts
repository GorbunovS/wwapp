import sunnyImage from '../assets/marks/sunny.png'
import rainyImage from '../assets/marks/rainy.png'
import cloudyImage from '../assets/marks/cloudy.png'
import snowyImage from '../assets/marks/snowy.png'
import foggyImage from '../assets/marks/foggy.png'
import thunderstormImage from '../assets/marks/thunderstorm.png'

import sunnyImageCover from '../assets/weather/sunny.png'
import rainyImageCover from '../assets/weather/rainy.png'
import cloudyImageCover from '../assets/weather/cloudy.png'
import defaultImageCover from '../assets/weather/default.png'

export type WeatherCondition =
  | 'sunny'
  | 'rainy'
  | 'cloudy'
  | 'snowy'
  | 'foggy'
  | 'thunderstorm'
  | 'default'

export const getWeatherCondition = (description: string): WeatherCondition => {
  const desc = description.toLowerCase();

  if (desc.includes('ясно') || desc.includes('солнце') || desc.includes('чист')) {
    return 'sunny'
  }
  if (desc.includes('дожд') || desc.includes('ливен')) {
    return 'rainy'
  }
  if (desc.includes('облач') || desc.includes('пасмурн') || desc.includes('перемен')) {
    return 'cloudy'
  }
  if (desc.includes('снег') || desc.includes('снеж')) {
    return 'snowy'
  }
  if (desc.includes('туман') || desc.includes('дымк')) {
    return 'foggy'
  }
  if (desc.includes('гроз') || desc.includes('гром')) {
    return 'thunderstorm'
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
    default: sunnyImage,
  }

  return imageMap[condition] || imageMap.default;
}

export const getWeatherImage = (description: string): string => {
  const condition = getWeatherCondition(description)

  const imageMap: Partial<Record<WeatherCondition, string>> = {
    sunny: sunnyImageCover,
    rainy: rainyImageCover,
    cloudy: cloudyImageCover,
  }

  return imageMap[condition] || defaultImageCover;
}
