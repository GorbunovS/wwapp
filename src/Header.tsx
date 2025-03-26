import { FC } from 'react';
import { Link } from 'react-router-dom';
import '../src/styles/Header.css';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        {}
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="Логотип" />
          <span>WWAPP</span>
        </Link>

        {}
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/map">Карта</Link></li>
          </ul>
        </nav>

        {}
        <div className="auth-buttons">
          <button className="login-btn">Войти</button>
          <button className="register-btn">Регистрация</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

