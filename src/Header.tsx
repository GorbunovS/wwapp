import { FC } from 'react'
import { Link } from 'react-router-dom'
import '../src/styles/Header.css'

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        {}
        <Link to="/" className="logo">
          <img src="wwapp/src/assets/logo.svg" alt="Логотип" />
        </Link>

        {}
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/map">Карта</Link>
            </li>
          </ul>
        </nav>

        {}
        <div className="auth-buttons">{/* Тут сделаю кнопки авторизации (возможно) */}</div>
      </div>
    </header>
  )
}

export default Header
