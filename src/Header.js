import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import { Link } from 'react-router-dom'
import '../src/styles/Header.css'
const Header = () => {
  return _jsx('header', {
    className: 'header',
    children: _jsxs('div', {
      className: 'header-container',
      children: [
        _jsx(Link, {
          to: '/',
          className: 'logo',
          children: _jsx('img', {
            src: './src/assets/logo.svg',
            alt: '\u041B\u043E\u0433\u043E\u0442\u0438\u043F',
          }),
        }),
        _jsx('nav', {
          className: 'nav',
          children: _jsx('ul', {
            className: 'nav-list',
            children: _jsx('li', {
              children: _jsx(Link, {
                to: '/',
                children:
                  '\u041F\u043E\u0433\u043E\u0434\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430',
              }),
            }),
          }),
        }),
        _jsx('div', { className: 'auth-buttons' }),
      ],
    }),
  })
}
export default Header
