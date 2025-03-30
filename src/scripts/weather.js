export const getWeatherCondition = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('солнечно') || desc.includes('sunny'))
        return 'sunny';
    if (desc.includes('дождь') || desc.includes('rain'))
        return 'rainy';
    if (desc.includes('облачно') || desc.includes('cloud'))
        return 'cloudy';
    if (desc.includes('снег') || desc.includes('snow'))
        return 'snowy';
    if (desc.includes('туман') || desc.includes('fog'))
        return 'foggy';
    if (desc.includes('гроза') || desc.includes('thunder'))
        return 'thunderstorm';
    return 'default';
};
export const getWeatherImage = (condition) => {
    const imageMap = {
        sunny: '/assets/weather/sunny.png',
        rainy: '/assets/weather/rainy.png',
        cloudy: '/assets/weather/cloudy.png',
        snowy: '/assets/weather/snowy.png',
        foggy: '/assets/weather/foggy.png',
        thunderstorm: '/assets/weather/thunderstorm.png',
        default: '/assets/weather/default.png',
    };
    return imageMap[condition];
};
