import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon, VerifiedIcon, MessageIcon, LocationIcon } from './Icons'
import heroImage from '../assets/hero.jpg'
import './Hero.scss'

function Hero() {
  const { theme, toggleTheme } = useTheme()
  const [pageVisits, setPageVisits] = useState(0)
  const [likes, setLikes] = useState(0)
  const [projects, setProjects] = useState(0)
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  useEffect(() => {
    const updateStats = () => {
      const storedVisits = localStorage.getItem('portfolioVisits')
      if (storedVisits) {
        setPageVisits(parseInt(storedVisits))
      } else {
        setPageVisits(0)
      }

      const storedLikes = localStorage.getItem('portfolioLikes')
      if (storedLikes) {
        setLikes(parseInt(storedLikes))
      } else {
        setLikes(0)
      }

      const storedProjects = localStorage.getItem('portfolioProjects')
      if (storedProjects) {
        setProjects(parseInt(storedProjects))
      } else {
        setProjects(0)
      }
    }

    updateStats()

    const handleStorageUpdate = () => {
      updateStats()
    }

    const handleStorageChange = (e) => {
      if (e.key === 'portfolioProjects' || e.key === 'portfolioLikes' || e.key === 'portfolioVisits') {
        updateStats()
      }
    }

    window.addEventListener('portfolioStatsUpdate', handleStorageUpdate)
    window.addEventListener('storage', handleStorageChange)

    const interval = setInterval(updateStats, 1000)

    return () => {
      window.removeEventListener('portfolioStatsUpdate', handleStorageUpdate)
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-card">
          {/* Compact Header */}
          <div className="hero-header">
            <div 
              className="avatar-compact"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
            >
              <div className={`avatar-img ${isHoveringImage ? 'hovered' : ''}`}>
                <img 
                  src={heroImage} 
                  alt="Bart Jason Edades" 
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="avatar-fallback" style={{ display: 'none' }}>BE</div>
                <div className="avatar-overlay">🎨</div>
              </div>
              <div className="status-dot"></div>
            </div>

            <div className="header-info">
              <div className="name-section">
                <h1>koisbart <VerifiedIcon className="verified" /></h1>
                <p>Bart Jason Edades</p>
              </div>
              
              <button 
                className={`theme-btn ${theme}`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
          </div>

          {/* Ultra Compact Stats */}
          <div className="stats-row">
            <div className="stat">
              <strong>{projects}</strong>
              <span>Projects</span>
            </div>
            <div className="stat">
              <strong>{likes}</strong>
              <span>Likes</span>
            </div>
            <div className="stat">
              <strong>{pageVisits}</strong>
              <span>Views</span>
            </div>
          </div>

          {/* Minimal Bio */}
          <p className="bio">
           wawa
          </p>

          <div className="location">
            <LocationIcon />
            <span>Antipolo City, Rizal, PH</span>
          </div>

          {/* Compact Actions */}
          <div className="actions">
            <button className="btn-primary">
              Message
            </button>
            <button className="btn-secondary">
              Email
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero