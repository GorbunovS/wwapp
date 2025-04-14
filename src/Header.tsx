import { FC, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../src/styles/Header.css'
import { EUROPEAN_CAPITALS } from './scripts/wheatherData'

const Header: FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }, [searchHistory])

  const handleSearch = (cityName: string) => {
    const city = EUROPEAN_CAPITALS.find(
      (city) =>
        city.name.toLowerCase().includes(cityName.toLowerCase()) ||
        city.nameEn.toLowerCase().includes(cityName.toLowerCase())
    )

    if (city) {
      if (!searchHistory.includes(city.name)) {
        setSearchHistory((prev) => [city.name, ...prev].slice(0, 5))
      }
      setSearchTerm('')
      setShowHistory(false)
      navigate(`city/${city.nameEn}`)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="" replace className="logo">
          <img src="./src/assets/logo.png" alt="Логотип" />
        </Link>

        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setShowHistory(true)
            }}
            onFocus={() => setShowHistory(true)}
            placeholder="Поиск города..."
            className="search-input"
          />
          {showHistory && searchTerm === '' && searchHistory.length > 0 && (
            <div className="search-history">
              <h4>История поиска:</h4>
              {searchHistory.map((city, index) => (
                <div key={index} className="history-item" onClick={() => handleSearch(city)}>
                  {city}
                </div>
              ))}
            </div>
          )}
          {showHistory && searchTerm !== '' && (
            <div className="search-suggestions">
              {EUROPEAN_CAPITALS.filter(
                (city) =>
                  city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  city.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((city, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSearch(city.name)}
                >
                  {city.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="" replace>
                Погодная карта
              </Link>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons"></div>
      </div>
    </header>
  )
}

export default Header
