const API_KEY = 'f69f83d93f2bdce6419d2bf34b0f7934';
const EUROPEAN_CAPITALS = [
    { name: 'Москва', coords: [55.7558, 37.6173] },
    { name: 'Лондон', coords: [51.5074, -0.1278] },
    { name: 'Париж', coords: [48.8566, 2.3522] },
    { name: 'Берлин', coords: [52.52, 13.405] },
    { name: 'Мадрид', coords: [40.4168, -3.7038] },
];
const formatTemp = (temp) => {
    return `${temp > 0 ? '+' : ''}${Math.round(temp)}°C`;
};
export const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;
        const currentRes = await fetch(currentUrl);
        const currentData = await currentRes.json();
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru&cnt=8`;
        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();
        const dailyForecast = [];
        const seenDays = new Set();
        forecastData.list.forEach((item) => {
            const date = new Date(item.dt * 1000).toLocaleDateString('ru-RU');
            if (!seenDays.has(date) && dailyForecast.length < 3) {
                seenDays.add(date);
                dailyForecast.push({
                    date,
                    temp: item.main.temp,
                    description: item.weather[0].description,
                });
            }
        });
        const result = {
            id: 0,
            name: currentData.name || 'Местоположение',
            position: [lat, lon],
            currentTemp: formatTemp(currentData.main.temp),
            currentDesc: currentData.weather[0].description,
            forecast: dailyForecast,
        };
        return result;
    }
    catch {
        return null;
    }
};
export const fetchSimpleWeatherForecast = async (apiKey) => {
    try {
        console.log('Загрузка данных о погоде для всех городов...');
        const results = await Promise.all(EUROPEAN_CAPITALS.map(async (city, index) => {
            const [lat, lon] = city.coords;
            const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
            const currentRes = await fetch(currentUrl);
            const currentData = await currentRes.json();
            console.log(`Данные о погоде для ${city.name}:`, currentData);
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru&cnt=8`;
            const forecastRes = await fetch(forecastUrl);
            const forecastData = await forecastRes.json();
            const dailyForecast = [];
            const seenDays = new Set();
            forecastData.list.forEach((item) => {
                const date = new Date(item.dt * 1000).toLocaleDateString('ru-RU');
                if (!seenDays.has(date) && dailyForecast.length < 3) {
                    seenDays.add(date);
                    dailyForecast.push({
                        date,
                        temp: item.main.temp,
                        description: item.weather[0].description,
                    });
                }
            });
            const result = {
                id: index + 1,
                name: city.name,
                position: [lat, lon],
                currentTemp: formatTemp(currentData.main.temp),
                currentDesc: currentData.weather[0].description,
                forecast: dailyForecast,
            };
            return result;
        }));
        return results;
    }
    catch {
        return [];
    }
};
