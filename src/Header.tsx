import { FC } from 'react'
import { Link } from 'react-router-dom'
import '../src/styles/Header.css'

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="./src/assets/logo.svg" alt="Логотип" />
        </Link>

        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/">Погодная карта</Link>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons"></div>
      </div>
    </header>
  )
}

export default Header
