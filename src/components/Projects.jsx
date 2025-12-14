import { useState, useEffect, useRef } from 'react'
import './Projects.scss'
import { FolderIcon, StarIcon, ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons'
import project1 from '../assets/Project 1.png'
import project2 from '../assets/Project 2.png'
import project3 from '../assets/Project 3.png'
import project4 from '../assets/Project 4.png'
import project5 from '../assets/Project 5.png'
import project6 from '../assets/Project 6.png'
import project7 from '../assets/Project 7.png'

function Projects() {
  const [projectsCount, setProjectsCount] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: 'Gzing App',
      description: 'GzingApp is your all-in-one navigation companion with real-time traffic updates, emergency SOS features, and intelligent route planning. Get where you need to go safely and efficiently.',
      technologies: ['Kotlin', 'Blade', 'Laravel', 'MySQL', 'Mapbox', 'Composer', 'Notimnatam'],
      image: project1,
      link: '#',
      linkText: 'https://powderblue-pig-261057.hostingersite.com/',
      featured: true
    },
    {
      id: 2,
      title: 'TechnoMatch',
      description: 'A Gamified Programming Quiz Game that tests your knowledge of programming concepts and algorithms.',
      technologies: ['React', 'Node.js', 'Monaco Editor', 'Judge0', 'Socket.io', 'Vite', 'SCSS', 'Laravel', 'MySQL'],
      image: project2,
      link: '#',
      linkText: 'https://technomatch.fun/',
      featured: true
    },
    {
      id: 3,
      title: 'PlayBright:Learning for Special Learner',
      description: 'A web-based ordering system for a bakery business. It allows customers to order products online and track their order status.',
      technologies: ['Vite', 'React', 'SCSS', 'Express.js', 'Firebase', 'Composer', 'Kotlin'],
      image: project3,
      link: 'https://playbright-4c1cd.web.app/login',
      linkText: 'Explore Dashboard',
      featured: false
    },
    {
      id: 4,
      title: 'BakedbyC: Web-Base Ordering System',
      description: 'A web-based ordering system for a bakery business. It allows customers to order products online and track their order status.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
      image: project4,
      featured: false
    },
    {
      id: 5,
      title: 'Royal Global Food Company',
      description: 'Welcome to Royal Global Food, your premier partner in food importing, distribution, and wholesaler, proudly based in Sydney, Australia.',
      technologies: ['Shopify Builder', 'Liquid (Shopify)'],
      image: project5,
      link: 'https://www.royalglobalfood.com.au/',
      linkText: 'https://www.royalglobalfood.com.au/',
      featured: false
    },
    {
      id: 6,
      title: 'Gracious Smile Dental Clinic',
      description: 'Gracious Smile Dental Clinic is a dental clinic that provides dental services to the community.',
      technologies: ['laravel', 'Mysql', 'Blade', 'SCSS', 'Composer'],
      image: project6,
      link: '#',

      featured: false
    },
    {
      id: 7,
      title: 'Eye in the Sky',
      description: 'Eye in the Sky is a web-based application that completes solution for security and surveillance needs.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
      image: project7,
      link: '#',
      featured: false
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
      const scrollAmount = 500
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
          <h2 className="section-title">
            <FolderIcon className="section-icon" />
            <span>Featured Work</span>
          </h2>
          <p className="section-subtitle">Explore my recent projects and technical achievements</p>
        </div>

        <div className="projects-wrapper">
          <div className="projects-scroll-container" ref={scrollContainerRef} onScroll={handleScroll}>
            <div className="projects-scroll">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <div className="header-content">
                      <h3 className="project-title">{project.title}</h3>
                      {project.featured && (
                        <div className="featured-badge">
                          <StarIcon className="star-icon" />
                          <span>Featured</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="project-laptop">
                    <div className="laptop-screen">
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
                    </div>
                  </div>

                  <div className="project-content">
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      <span>{project.linkText}</span>
                      <ExternalLinkIcon className="link-icon" />
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

        <div className="projects-footer">
          <p className="total-projects">Total Projects: <strong>{projectsCount}</strong></p>
          <a href="#" className="view-all-link">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects