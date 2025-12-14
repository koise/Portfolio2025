import { useTheme } from '../context/ThemeContext'
import './Header.scss'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <a href="#home">Portfolio</a>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Tech Stack</a></li>
          <li><a href="#engagements">Engagements</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  )
}

export default Header

