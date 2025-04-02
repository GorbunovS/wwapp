
import sunnyImage from '../assets/marks/sunny.png';
import rainyImage from '../assets/marks/rainy.png';
import cloudyImage from '../assets/marks/cloudy.png';
import snowyImage from '../assets/marks/snowy.png';
import foggyImage from '../assets/marks/foggy.png';
import thunderstormImage from '../assets/marks/thunderstorm.png';

export type WeatherCondition =
  | 'sunny'
  | 'rainy'
  | 'cloudy'
  | 'snowy'
  | 'foggy'
  | 'thunderstorm'
  | 'default';

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
};

export const getWeatherCondition = (description: string): WeatherCondition => {
  const desc = description.toLowerCase();

  for (const [key, value] of Object.entries(weatherDescriptions)) {
    if (desc.includes(key)) {
      return value;
    }
  }

  return 'default';
};

export const getMarkStyleURL = (description: string): string => {
  const condition = getWeatherCondition(description);

  const imageMap: Record<WeatherCondition, string> = {
    sunny: sunnyImage,
    rainy: rainyImage,
    cloudy: cloudyImage,
    snowy: snowyImage,
    foggy: foggyImage,
    thunderstorm: thunderstormImage,
 
  };
  

  return imageMap[condition] || imageMap.default;
};

export const getWeatherImage = (description: string): string => {
  const condition = getWeatherCondition(description);

  const imageMap: Record<WeatherCondition, string> = {
    sunny: '/assets/weather/sunny.png',
    rainy: '/assets/weather/rainy.png',
    cloudy: '/assets/weather/cloudy.png',
    snowy: '/assets/weather/snowy.png',
    foggy: '/assets/weather/foggy.png',
    thunderstorm: '/assets/weather/thunderstorm.png',
    default: '/assets/weather/default.png',
  };

  return imageMap[condition] || imageMap.default;
};
