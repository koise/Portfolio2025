import { useState, useEffect, useRef } from 'react'
import './Projects.scss'
import { FolderIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon, ThumbsUpIcon } from './Icons'
import project1 from '../assets/projects/Project 1.png'
import project2 from '../assets/projects/Project 2.png'
import project3 from '../assets/projects/Project 3.png'
import project4 from '../assets/projects/Project 4.png'
import project5 from '../assets/projects/Project 5.png'
import project6 from '../assets/projects/Project 6.png'
import project7 from '../assets/projects/Project 7.png'
import { incrementLikes } from '../config/firebase'

function Projects() {
  const [projectsCount, setProjectsCount] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [hoveredProject, setHoveredProject] = useState(null)
  const scrollContainerRef = useRef(null)

const projects = [
  {
    id: 1,
    title: 'Royal Global Food',
    description: 'Sydney-based food importer, distributor, and wholesaler.',
    technologies: ['Shopify', 'Liquid'],
    image: project5,
    featured: true,
    color: '#ff0b44ff'
  },
  {
    id: 5,
    title: 'Gzing App',
    description: 'Smart navigation app with real-time traffic, SOS, and route planning.',
    technologies: ['Kotlin', 'Laravel', 'Blade', 'Mapbox'],
    image: project1,
    featured: true,
    color: '#F5F5DC'
  },
  {
    id: 3,
    title: 'PlayBright',
    description: 'Interactive learning platform for special learners.',
    technologies: ['React', 'SCSS', 'Express', 'Firebase'],
    image: project3,
    featured: true,
    color: '#9B59B6'
  },
  {
    id: 2,
    title: 'TechnoMatch',
    description: 'Gamified programming quiz and coding challenge platform.',
    technologies: ['React', 'Monaco', 'Judge0', 'Socket.io'],
    image: project2,
    featured: true,
    color: '#d22b2bff'
  },
  {
    id: 7,
    title: 'Eye in the Sky',
    description: 'Web-based security and surveillance management system.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML',],
    image: project7,
    featured: false,
    color: '#f65200ff'
  },
  {
    id: 6,
    title: 'Gracious Smile Dental Clinic',
    description: 'Clinic management system for dental services.',
    technologies: ['Laravel', 'MySQL', 'Blade', 'PWA'],
    image: project6,
    featured: false,
    color: '#0a89e3ff'
  },
  {
    id: 4,
    title: 'BakedbyC',
    description: 'Online ordering and tracking system for a bakery.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML'],
    image: project4,
    featured: false,
    color: '#d99560ff'
  }
]


  useEffect(() => {
    const count = projects.length
    setProjectsCount(count)
    localStorage.setItem('portfolioProjects', count.toString())
    window.dispatchEvent(new CustomEvent('portfolioStatsUpdate'))
  }, [projects.length])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <div className="header-top">
            <h2 className="section-title">
              <FolderIcon className="section-icon" />
              <span>Projects</span>
            </h2>
            <div className="header-accent" />
          </div>
          <p className="section-subtitle">Explore my recent projects and technical achievements</p>
        </div>

        <div className="projects-wrapper">
          <div className="projects-scroll-container" ref={scrollContainerRef} onScroll={handleScroll}>
            <div className="projects-scroll">
              {projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`project-card ${hoveredProject === project.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{ '--project-color': project.color, '--animation-order': index }}
                >
                  {project.featured && (
                    <div className="featured-corner">
                      <StarIcon className="corner-star" />
                    </div>
                  )}
                  
                  <div className="project-visual">
                    <div className="visual-frame">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="project-image"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="placeholder-image" style={{ display: 'none' }}>
                        <span className="image-text">{project.title}</span>
                      </div>
                      <div className="image-overlay" />
                    </div>
                  </div>

                  <div className="project-details">
                    <div className="details-header">
                      <h3 className="project-title">{project.title}</h3>
                      <button
                        className="like-button"
                        onClick={() => {
                          // Increment global likes counter in Firestore
                          incrementLikes(1).catch((err) => {
                            console.error('Failed to increment likes', err)
                          })
                        }}
                      >
                        <ThumbsUpIcon />
                      </button>
                    </div>
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-tech">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span key={techIndex} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="tech-more">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                  </div>

                  <div className="project-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {canScrollLeft && (
            <button 
              className="nav-button nav-left" 
              onClick={() => scroll('left')} 
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="nav-icon" />
            </button>
          )}

          {canScrollRight && (
            <button 
              className="nav-button nav-right" 
              onClick={() => scroll('right')} 
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="nav-icon" />
            </button>
          )}
        </div>

        <div className="projects-footer">
          <div className="footer-stat">
          
          </div>
          <a href="https://github.com/koise?tab=repositories" className="view-more">
            <span>View All Projects</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects