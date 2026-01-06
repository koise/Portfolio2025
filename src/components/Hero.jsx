import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon, VerifiedIcon, MessageIcon, LocationIcon } from './Icons'
import heroImage from '../assets/hero.jpg'
import resumePdf from '../assets/resume/EDADES-CV.pdf'
import { getStats, subscribeToStats, incrementViews } from '../config/firebase'
import './Hero.scss'

function Hero() {
  const { theme, toggleTheme } = useTheme()
  const [pageVisits, setPageVisits] = useState(0)
  const [likes, setLikes] = useState(0)
  const [projects, setProjects] = useState(0)
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  useEffect(() => {
    // Load projects count from localStorage (unchanged)
    const storedProjects = localStorage.getItem('portfolioProjects')
    if (storedProjects) {
      setProjects(parseInt(storedProjects))
    } else {
      setProjects(0)
    }

    // Subscribe to Firestore stats so Likes and Views are kept in sync
    let unsubscribe
    getStats().then((data) => {
      if (data) {
        setPageVisits(data.views || 0)
        setLikes(data.likes || 0)
      } 
    }).catch((err) => console.error('getStats failed', err))

    subscribeToStats((data) => {
      setPageVisits(data.views || 0)
      setLikes(data.likes || 0)
    }).then((unsub) => {
      unsubscribe = unsub
    }).catch((err) => console.error('subscribeToStats failed', err))

    // Count a view on initial load
    incrementViews().catch((err) => console.error('incrementViews failed', err))

    // Keep backwards-compatible event listener for other parts of app if needed
    const handleStorageChange = (e) => {
      if (e.key === 'portfolioProjects') {
        const stored = localStorage.getItem('portfolioProjects')
        setProjects(stored ? parseInt(stored) : 0)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      if (typeof unsubscribe === 'function') unsubscribe()
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

          <div className="location">
            <LocationIcon />
            <span>Antipolo City, Rizal, PH</span>
          </div>
          
          {/* Compact Actions */}
          <div className="actions">
            <button className="btn-primary">
              Message me on Facebook
            </button>
            <a
              href={resumePdf}
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero