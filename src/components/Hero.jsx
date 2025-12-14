import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon, VerifiedIcon, MessageIcon, EmailIcon, ChevronUpIcon, ChevronDownIcon } from './Icons'
import heroImage from '../assets/hero.jpg'
import './Hero.scss'

function Hero() {
  const { theme, toggleTheme } = useTheme()
  const [pageVisits, setPageVisits] = useState(0)
  const [likes, setLikes] = useState(0)
  const [projects, setProjects] = useState(0)

  useEffect(() => {
    // Function to update all stats from localStorage
    const updateStats = () => {
      // Load page visits counter (FloatingActionBar handles incrementing)
      const storedVisits = localStorage.getItem('portfolioVisits')
      if (storedVisits) {
        setPageVisits(parseInt(storedVisits))
      } else {
        setPageVisits(0)
      }

      // Load likes count
      const storedLikes = localStorage.getItem('portfolioLikes')
      if (storedLikes) {
        setLikes(parseInt(storedLikes))
      } else {
        setLikes(0)
      }

      // Load projects count dynamically
      const storedProjects = localStorage.getItem('portfolioProjects')
      if (storedProjects) {
        setProjects(parseInt(storedProjects))
      } else {
        setProjects(0)
      }
    }

    // Initial load
    updateStats()

    // Listen for custom events from other components
    const handleStorageUpdate = () => {
      updateStats()
    }

    // Listen for storage events (from other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === 'portfolioProjects' || e.key === 'portfolioLikes' || e.key === 'portfolioVisits') {
        updateStats()
      }
    }

    // Listen for custom events
    window.addEventListener('portfolioStatsUpdate', handleStorageUpdate)
    window.addEventListener('storage', handleStorageChange)

    // Also poll for changes (in case custom events don't work)
    const interval = setInterval(updateStats, 1000)

    return () => {
      window.removeEventListener('portfolioStatsUpdate', handleStorageUpdate)
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-top-controls">
        <div className="theme-toggle-container">
          <SunIcon className="theme-icon" />
          <button 
            className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="toggle-slider"></span>
          </button>
          <MoonIcon className="theme-icon" />
        </div>
      </div>

      <div className="container">
        <div className="profile-section">
          <div className="profile-image-container">
            <div className="profile-note">
              <span>Let's Connect?</span>
              <div className="note-arrows">
                <ChevronUpIcon />
                <ChevronDownIcon />
              </div>
            </div>
            <div className="profile-image">
              <img 
                src={heroImage} 
                alt="Bart Jason Edades" 
                className="profile-photo"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="placeholder-image" style={{ display: 'none' }}>
                <span>Your Photo</span>
              </div>
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-header">
              <div className="username-row">
                <h1 className="username">koisbart</h1>
                <VerifiedIcon className="verified-icon" />
              </div>
              <p className="real-name">Bart Jason Edades</p>
            </div>

            <div className="profile-content-row">
              <div className="activity-stats">
                <div className="stat-item">
                  <span className="stat-value">{projects}</span>
                  <span className="stat-label">projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{likes}</span>
                  <span className="stat-label">likes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{pageVisits}</span>
                  <span className="stat-label">views</span>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn btn-message">
                  <MessageIcon className="btn-icon" />
                  <span>Send a Message</span>
                </button>
                <button className="btn btn-email">
                  <EmailIcon className="btn-icon" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>

            <div className="profile-bio">
              <p className="bio-text">
                I'm a student developer focused on building fun, interactive projects using modern frameworks, API integrations, and AI prompt engineering. I enjoy creating applications that combine clean design with practical functionality, experimenting with emerging technologies, and turning ideas into real-world solutions. My development work centers on API-driven systems, AI-powered features, and modern web and mobile, with a strong emphasis on continuous learning, hands-on experience, and growth as a future software developer.
              </p>
              <p className="linked-account">
                <span className="account-icon">@</span>
                <span>koisbart</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
