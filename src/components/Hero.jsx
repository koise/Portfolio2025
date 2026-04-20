import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import {
  SunIcon, MoonIcon, VerifiedIcon, LocationIcon, EmailIcon,
  GithubIcon, LinkedInIcon, FacebookIcon
} from './Icons'
import heroImage from '../assets/hero.jpg'
import heroHoverImage from '../assets/hero-hover.jpg'
import resumePdf from '../assets/resume/EDADES-CV.pdf'
import './Hero.scss'

const TOTAL_CERTIFICATES = 8
const TOTAL_PROJECTS = 10

const SOCIALS = [
  {
    href: 'https://github.com/koise',
    label: 'GitHub',
    Icon: GithubIcon,
    handle: 'koise',
  },
  {
    href: 'https://www.linkedin.com/in/bart-jason-guevarra-edades-a3a2993a5/',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
    handle: 'bartjasonedades',
  },
  {
    href: 'https://www.facebook.com/k4hel.1/',
    label: 'Facebook',
    Icon: FacebookIcon,
    handle: 'k4hel.1',
  },
]

function Hero() {
  const { theme, toggleTheme } = useTheme()
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-card">

          <div className="hero-topbar">
            <div className="topbar-right">
              <span className="topbar-status">
                <span className="status-pulse" />
                Available for work
              </span>
              <button
                className={`theme-btn ${theme}`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
          </div>

          <div className="hero-body">

            <div className="hero-profile">
              <div
                className="avatar-wrap"
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
              >
                <div className={`avatar ${isHoveringImage ? 'hovered' : ''}`}>
                  <img
                    src={heroImage}
                    alt="Bart Jason Edades"
                    className="avatar-default"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <img
                    src={heroHoverImage}
                    alt="Bart Jason Edades"
                    className="avatar-hover"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="avatar-fallback">BE</div>
                </div>
                <span className="online-dot" />
              </div>

              <div className="profile-info">
                <div className="profile-handle">
                  <span>@koisbart</span>
                  <VerifiedIcon className="verified-icon" />
                </div>
                <h1 className="profile-name">Bart Jason Edades</h1>
                <p className="profile-bio">
                  Full-stack Web &amp; Mobile developer crafting scalable experiences
                  with React and Laravel. Curious by nature, always building.
                </p>
                <div className="profile-meta">
                  <span className="meta-chip">
                    <LocationIcon className="meta-icon" /> Antipolo City, PH
                  </span>
                  <span className="meta-chip">
                    <EmailIcon className="meta-icon" /> wbartjason@gmail.com
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-num">{TOTAL_CERTIFICATES}</span>
                <span className="stat-label">Certifications</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">{TOTAL_PROJECTS}</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="https://www.facebook.com/k4hel.1/" className="btn-primary" target="_blank" rel="noopener noreferrer">
                Let's Talk
              </a>
              <a href={resumePdf} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </div>

            <div className="hero-socials">
              {SOCIALS.map(({ href, label, Icon, handle }) => (
                <a key={label} href={href} className="social-item" target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className="social-icon" />
                  <div className="social-text">
                    <span className="social-label">{label}</span>
                    <span className="social-handle">/{handle}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero