import { useState, useRef, useEffect } from 'react'
import './Certifications.scss'
import { TrophyIcon, StarIcon, ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons'

function Certifications() {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    // Check initial scroll state
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollRight(scrollWidth > clientWidth)
    }
  }, [])

  const certifications = [
    {
      id: 1,
      title: 'Friend of the Frame: Community Kickoff 2024',
      description: 'Participated in The Frame: Breaking into UI/UX Design.',
      image: 'cert-placeholder-1',
      link: '#',
      linkText: 'View Certificate',
      featured: true
    },
    {
      id: 2,
      title: 'Penetration Testing and Red Team Training',
      description: 'Completed the Penetration Testing and Red Team Training conducted by Streetlevel Ministries.',
      image: 'cert-placeholder-2',
      link: '#',
      linkText: 'View Certificate',
      featured: true
    },
    {
      id: 3,
      title: 'Certification Name 3',
      description: 'A brief description of your certification.',
      image: 'cert-placeholder-3',
      link: '#',
      linkText: 'View Certificate',
      featured: false
    }
  ]

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
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="certifications" className="certifications">
      <div className="container">
        <h2 className="section-title">
          <TrophyIcon className="section-icon" />
          <span>Certifications</span>
        </h2>
        <div className="certifications-wrapper">
          <div className="certifications-scroll-container" ref={scrollContainerRef} onScroll={handleScroll}>
            <div className="certifications-scroll">
              {certifications.map((cert) => (
                <div key={cert.id} className="cert-card">
                  <div className="cert-header">
                    <h3 className="cert-title">{cert.title}</h3>
                    {cert.featured && <StarIcon className="star-icon" />}
                  </div>
                  <div className="cert-laptop">
                    <div className="laptop-screen">
                      <div className="placeholder-image">
                        <span>{cert.image}</span>
                      </div>
                    </div>
                  </div>
                  <div className="cert-content">
                    <p className="cert-description">{cert.description}</p>
                    <a href={cert.link} className="cert-link" target="_blank" rel="noopener noreferrer">
                      {cert.linkText} <ExternalLinkIcon className="link-icon" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {canScrollLeft && (
            <button className="scroll-button scroll-left" onClick={() => scroll('left')} aria-label="Scroll left">
              <ChevronLeftIcon className="scroll-icon" />
            </button>
          )}

          {canScrollRight && (
            <button className="scroll-button scroll-right" onClick={() => scroll('right')} aria-label="Scroll right">
              <ChevronRightIcon className="scroll-icon" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Certifications
