# Weather Map Application

Интерактивная карта погоды с прогнозом для крупных европейских городов.

![Weather Map Preview](./preview.png)

## 🌟 Особенности

- 🗺️ Интерактивная карта с погодными маркерами
- 🌡️ Детальный прогноз погоды для каждого города
- 🔍 Умный поиск с историей запросов
- 🌍 Поддержка нескольких городов
- ⏰ Отображение местного времени
- 📱 Адаптивный дизайн
- 🎨 Современный UI с эффектами размытия

## 🚀 Технологии

- React 18
- TypeScript
- React Router v6
- Leaflet для карт
- OpenWeatherMap API
- MapTiler API
- LocalStorage для сохранения пользовательских данных
- CSS Modules
- ESLint + TypeScript ESLint
- Jest для тестирования

## 📦 Установка

1. Клонируйте репозиторий:
\`\`\`bash
git clone https://github.com/yourusername/weather-map.git
\`\`\`

2. Установите зависимости:
\`\`\`bash
cd weather-map
npm install
\`\`\`

3. Создайте файл .env с необходимыми API ключами:
\`\`\`env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_MAPTILER_API_KEY=your_maptiler_api_key
\`\`\`

4. Запустите приложение:
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Скрипты

- \`npm run dev\` - Запуск в режиме разработки
- \`npm run build\` - Сборка проекта
- \`npm run test\` - Запуск тестов
- \`npm run lint\` - Проверка кода линтером
- \`npm run preview\` - Предпросмотр собранного проекта

## 📱 Роуты

- \`/\` - Главная страница с картой
- \`/city/:cityName\` - Детальный прогноз погоды для города

## 🧪 Тестирование
- Требует доработки

### Линтинг
- ESLint с TypeScript конфигурацией
- Проверка типов
- Правила для React и хуков


