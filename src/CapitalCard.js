import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { getWeatherImage } from '../src/scripts/weather'
const Card = ({ name, image, description, temperature }) => {
  const backgroundImage = image || getWeatherImage(description)
  return _jsxs('div', {
    className: 'card',
    style: {
      width: '400px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: "'PT Sans Caption', sans-serif",
    },
    children: [
      _jsx('div', {
        className: 'card-header',
        style: {
          height: '200px',
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          color: 'white',
          padding: '16px',
          boxSizing: 'border-box',
        },
        children: _jsx('h2', {
          style: { fontSize: '36px', margin: '0', fontWeight: '700' },
          children: name,
        }),
      }),
      _jsxs('div', {
        className: 'weather-info',
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#fff',
        },
        children: [
          _jsxs('div', {
            style: { display: 'flex', alignItems: 'center', gap: '8px' },
            children: [
              _jsx('p', {
                style: { fontSize: '24px', fontWeight: '900', margin: '0' },
                children: temperature,
              }),
              _jsx('p', {
                style: { fontSize: '16px', margin: '0', color: '#555' },
                children: description,
              }),
            ],
          }),
          _jsx('button', {
            style: {
              background: '#ccc',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            },
            children: '\u041F\u0440\u043E\u0433\u043D\u043E\u0437',
          }),
        ],
      }),
    ],
  })
}
export default Card
