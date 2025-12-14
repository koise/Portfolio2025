import { useState, useEffect } from 'react'
import { HeartIcon, HeartOutlineIcon, EyeIcon } from './Icons'
import './FloatingActionBar.scss'

function FloatingActionBar() {
  const [likes, setLikes] = useState(0)
  const [visits, setVisits] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    // Load likes from localStorage
    const storedLikes = localStorage.getItem('portfolioLikes')
    if (storedLikes) {
      setLikes(parseInt(storedLikes))
    }

    // Handle visits - increment on each page load
    const storedVisits = localStorage.getItem('portfolioVisits')
    const sessionKey = 'portfolioVisitSession'
    const currentSession = sessionStorage.getItem(sessionKey)
    
    if (!currentSession) {
      // New session - increment visits
      const newVisits = storedVisits ? parseInt(storedVisits) + 1 : 1
      setVisits(newVisits)
      localStorage.setItem('portfolioVisits', newVisits.toString())
      sessionStorage.setItem(sessionKey, 'true')
      // Notify Hero component
      window.dispatchEvent(new CustomEvent('portfolioStatsUpdate'))
    } else {
      // Same session - just display current count
      setVisits(storedVisits ? parseInt(storedVisits) : 0)
    }

    // Check if user has already liked
    const liked = localStorage.getItem('portfolioHasLiked') === 'true'
    setHasLiked(liked)
  }, [])

  const handleLike = () => {
    if (hasLiked) {
      // Unlike
      const newLikes = Math.max(0, likes - 1)
      setLikes(newLikes)
      setHasLiked(false)
      localStorage.setItem('portfolioLikes', newLikes.toString())
      localStorage.setItem('portfolioHasLiked', 'false')
      // Notify Hero component
      window.dispatchEvent(new CustomEvent('portfolioStatsUpdate'))
    } else {
      // Like
      const newLikes = likes + 1
      setLikes(newLikes)
      setHasLiked(true)
      localStorage.setItem('portfolioLikes', newLikes.toString())
      localStorage.setItem('portfolioHasLiked', 'true')
      // Notify Hero component
      window.dispatchEvent(new CustomEvent('portfolioStatsUpdate'))
    }
  }

  return (
    <div className="floating-action-bar">
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
