import { useState, useRef, useEffect } from 'react'
import './Certifications.scss'
import {
  TrophyIcon,
  StarIcon,
  ExternalLinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CarouselIcon,
  GridIcon,
  TableIcon
} from './Icons'

// Certificate assets
import cert1 from '../assets/certificates/cert1.jpg'
import cert2 from '../assets/certificates/cert2.png'
import cert3 from '../assets/certificates/cert3.png'
import cert4 from '../assets/certificates/cert4.png'
import cert5 from '../assets/certificates/cert5.png'
import cert6 from '../assets/certificates/cert6.jpg'
import cert7 from '../assets/certificates/cert7.png'
import cert8 from '../assets/certificates/cert8.png'

// ✅ FINAL: 8 ITEMS TOTAL (with proper structure)
export const certifications = [
  {
    id: 1,
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    image: cert7,
    link: cert7,
    linkText: 'View Certificate',
    featured: true,
    tags: ['Networking', 'Cisco', 'Infrastructure'],
    type: 'cert'
  },
  {
    id: 2,
    title: 'WordPress Website Development Training',
    image: cert8,
    link: cert8,
    linkText: 'View Certificate',
    featured: true,
    tags: ['Web Dev', 'WordPress'],
    type: 'cert'
  },
  {
    id: 8,
    title: 'Guest Speaker – Laravel Web Development',
    image: cert4,
    link: cert4,
    linkText: 'View Details',
    featured: true,
    tags: ['Laravel', 'PHP', 'Backend'],
    type: 'speaker'
  },
  {
    id: 3,
    title: 'AI, Quantum Computing & Automation',
    image: cert5,
    link: cert5,
    linkText: 'View Certificate',
    featured: true,
    tags: ['AI', 'Automation'],
    type: 'cert'
  },
  {
    id: 4,
    title: 'Introduction to SQL',
    image: cert2,
    link: cert2,
    linkText: 'View Certificate',
    featured: false,
    tags: ['Database', 'SQL'],
    type: 'cert'
  },
  {
    id: 5,
    title: 'Infrastructure and Cloud Computing',
    image: cert1,
    link: cert1,
    linkText: 'View Certificate',
    featured: false,
    tags: ['Cloud', 'Networking'],
    type: 'cert'
  },
  {
    id: 6,
    title: 'Mobile App Development Journey',
    image: cert6,
    link: cert6,
    linkText: 'View Certificate',
    featured: false,
    tags: ['Mobile Dev', 'UI/UX'],
    type: 'cert'
  },
]

function Certifications() {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [viewMode, setViewMode] = useState('carousel')
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollRight(scrollWidth > clientWidth)
    }
  }, [])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount)

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <div className="section-header">
          <div className="header-top">
            <h2 className="section-title">
              <TrophyIcon className="section-icon" />
              <span>Certifications</span>
            </h2>

            <div className="header-accent" />

            <div className="view-toggles">
              <button
                className={`toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
                onClick={() => setViewMode('carousel')}
              >
                <CarouselIcon />
              </button>

              <button
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <GridIcon />
              </button>

              <button
                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                <TableIcon />
              </button>
            </div>
          </div>

          <p className="section-subtitle">
            Certifications, Awards, and Speaking Engagements
          </p>
        </div>

        <div className={`certifications-wrapper view-${viewMode}`}>
          <div
            className="certifications-scroll-container"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <div className="certifications-scroll">
              {certifications.map((cert, index) => (
                <div 
                  key={cert.id} 
                  className="cert-card"
                  style={{
                    '--cert-color': cert.color || 'var(--accent)',
                    '--animation-order': index
                  }}
                >

                  <div className="cert-preview">
                    <div className="preview-screen">
                      <img src={cert.image} alt={cert.title} className="cert-image" />
                    </div>
                  </div>

                  <div className="cert-details">
                    <div className="cert-header">
                      <h3 className="cert-title">{cert.title}</h3>
                      {cert.featured && <span className="featured-label">FEATURED</span>}
                    </div>

                    <div className="cert-tech">
                      {cert.tags.map((tag, i) => (
                        <span key={i} className="tech-badge">{tag}</span>
                      ))}
                    </div>

                    <div className="cert-content">
                      <a
                        href={cert.link}
                        className="cert-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cert.linkText} <ExternalLinkIcon className="link-icon" />
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {viewMode === 'carousel' && canScrollLeft && (
            <button className="scroll-button scroll-left" onClick={() => scroll('left')}>
              <ChevronLeftIcon className="scroll-icon" />
            </button>
          )}

          {viewMode === 'carousel' && canScrollRight && (
            <button className="scroll-button scroll-right" onClick={() => scroll('right')}>
              <ChevronRightIcon className="scroll-icon" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Certifications