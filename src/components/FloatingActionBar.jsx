import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { HeartIcon, HeartOutlineIcon, SunIcon, MoonIcon } from './Icons'
import { incrementLikes, incrementViews, getStats, subscribeToStats } from '../config/firebase'
import './FloatingActionBar.scss'

function FloatingActionBar() {
  const { theme, toggleTheme } = useTheme()
  const [likes, setLikes] = useState(0)
  const [visits, setVisits] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Load persisted 'hasLiked' from localStorage (device-specific)
    const liked = localStorage.getItem('portfolioHasLiked') === 'true'
    setHasLiked(liked)

    // Subscribe to Firestore stats updates
    let unsubscribeStats
    try {
      // initial load
      getStats().then((data) => {
        if (data) {
          setLikes(data.likes || 0)
          setVisits(data.views || 0)
        }
      })

      // realtime updates
      subscribeToStats((data) => {
        setLikes(data.likes || 0)
        setVisits(data.views || 0)
      }).then((unsub) => {
        unsubscribeStats = unsub
      }).catch((err) => console.error('subscribeToStats failed', err))
    } catch (err) {
      console.error('Firestore stats subscribe failed', err)
    }

    // Handle visits - increment on each page load (once per session)
    const sessionKey = 'portfolioVisitSession'
    const currentSession = sessionStorage.getItem(sessionKey)
    if (!currentSession) {
      // New session - increment visits in Firestore
      incrementViews().catch((err) => console.error('incrementViews failed', err))
      sessionStorage.setItem(sessionKey, 'true')
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      // Unsubscribe snapshot if provided by subscribeToStats
      if (typeof unsubscribeStats === 'function') unsubscribeStats()
    }
  }, [])

  const handleLike = () => {
    if (hasLiked) {
      // Unlike (local optimistic update)
      const newLikes = Math.max(0, likes - 1)
      setLikes(newLikes)
      setHasLiked(false)
      localStorage.setItem('portfolioHasLiked', 'false')
      // Update Firestore
      incrementLikes(-1).catch((err) => console.error('decrement like failed', err))
    } else {
      // Like (local optimistic update)
      const newLikes = likes + 1
      setLikes(newLikes)
      setHasLiked(true)
      localStorage.setItem('portfolioHasLiked', 'true')
      // Update Firestore
      incrementLikes(1).catch((err) => console.error('increment like failed', err))
    }
  }

  return (
    <div className="floating-action-bar">
      {/* Theme Toggle - Only on Mobile */}
      {isMobile && (
        <div className="fab-item">
          <button 
            className="fab-button fab-theme"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="fab-icon" />
            ) : (
              <MoonIcon className="fab-icon" />
            )}
          </button>
        </div>
      )}

      {/* Like Button */}
      <div className="fab-item">
        <button 
          className={`fab-button ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={hasLiked ? 'Unlike' : 'Like'}
        >
          {hasLiked ? (
            <HeartIcon className="fab-icon" />
          ) : (
            <HeartOutlineIcon className="fab-icon" />
          )}
          <span className="fab-count">{likes}</span>
        </button>
      </div>
    </div>
  )
}

export default FloatingActionBar