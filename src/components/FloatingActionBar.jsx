import { useState, useEffect } from 'react'
import './FloatingActionBar.scss'

function FloatingActionBar() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0

      setScrollProgress(progress)
      setVisible(scrollTop > 300)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - scrollProgress * circumference

  return (
    <button
      className={`scroll-top-btn ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle
          className="progress-ring__track"
          cx="24" cy="24" r={radius}
          fill="none"
          strokeWidth="2"
        />
        <circle
          className="progress-ring__bar"
          cx="24" cy="24" r={radius}
          fill="none"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 24 24)"
        />
      </svg>
      <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

export default FloatingActionBar