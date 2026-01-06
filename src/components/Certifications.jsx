import { useState, useRef, useEffect } from 'react'
import './Certifications.scss'
import { TrophyIcon, StarIcon, ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons'

// Certificate assets (images & PDFs) - update titles/descriptions as you like
import cert1 from '../assets/certificates/cert1.jpg'
import cert2 from '../assets/certificates/cert2.png' // Code the Laravel Way (featured)
import cert3 from '../assets/certificates/cert3.png'
import cert4 from '../assets/certificates/cert4.png'
import cert5 from '../assets/certificates/cert5.png'
import cert6 from '../assets/certificates/cert6.jpg'
import cert7 from '../assets/certificates/cert7.png' // CCNA (featured)

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

  // You can freely edit the title and description fields below.
  // Only the Laravel and CCNA certificates are marked as featured.
  const certifications = [
    {
      id: 1,
      title: 'CCNA: Switching, Routing, and Wireless Essentials',
      description: 'It covers the fundamentals of networking, virtualization, and cloud services. It also covers the basics of cloud computing and the different types of cloud services.',
      image: cert7,
      link: cert7,
      linkText: 'View CCNA Certificate',
      featured: true
    },
    {
      id: 2,
      title: 'Code the Laravel Way (Guest Speaker)',
      description: 'It covers the fundamentals of Laravel, the basics of Laravel, and the basics of Laravel. It also covers the basics of Laravel and the different types of Laravel.',
      image: cert4,
      link: cert4,
      linkText: 'View Laravel Certificate',
      featured: true
    },
    {
      id: 5,
      title: 'The Digital Fabric: AI Imperatives and Risk, Quantum Computing, and Automated Business and Multimedia Augmentation',
      description: 'It covers the fundamentals of AI, the basics of AI, and the basics of AI. It also covers the basics of AI and the different types of AI.',
      image: cert5,
      link: cert5,
      linkText: 'View Certificate',
      featured: true
    },
    {
      id: 4,
      title: 'Introduction of SQL',
      description: 'It covers the fundamentals of SQL, the basics of SQL, and the basics of SQL. It also covers the basics of SQL and the different types of SQL.',
      image: cert2,
      link: cert2,
      linkText: 'View Certificate',
      featured: false
    },
    {
      id: 3,
      title: 'Infrastructure and Cloud Computing',
      description: 'It covers the fundamentals of networking, virtualization, and cloud services. It also covers the basics of cloud computing and the different types of cloud services.',
      image: cert1,
      link: cert1,
      linkText: 'View Certificate',
      featured: false
    },
    {
      id: 6,
      title: 'Mastering The Mobile App Journey:Development to Deployment',
      description: 'the basics of mobile app development, and the basics of mobile app development. It also covers the basics of mobile app development and the different types of mobile app development.',
      image: cert6,
      link: cert6,
      linkText: 'View Certificate',
      featured: false
    },
    {
      id: 3,
      title: 'Typography Trends in 2025: Shaping the Future of Design and User Experience',
      description: 'The basics of typography, and the basics of typography. It also covers the basics of typography and the different types of typography.',
      image: cert3,
      link: cert3,
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
                      {cert.image ? (
                        cert.link?.toLowerCase().endsWith('.pdf') ? (
                          <div className="placeholder-image pdf">
                            <span>PDF Preview</span>
                          </div>
                        ) : (
                          <img src={cert.image} alt={cert.title} className="cert-image" />
                        )
                      ) : (
                        <div className="placeholder-image">
                          <span>Certificate preview</span>
                        </div>
                      )}
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
