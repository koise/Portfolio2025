import './Contact.scss'
import { GithubIcon, LinkedInIcon, FacebookIcon, GlobeIcon } from './Icons'

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2 className="section-title">
        <GlobeIcon className="section-icon" />
        <span>Connect with me</span>
      </h2>
      <div className="contact-content">
        <div className="social-links-grid">
          <a href="#" className="social-link-card" aria-label="GitHub">
            <GithubIcon className="social-icon" />
            <span className="social-text">Follow me on Github</span>
          </a>
          <a href="#" className="social-link-card" aria-label="LinkedIn">
            <LinkedInIcon className="social-icon" />
            <span className="social-text">Connect on LinkedIn</span>
          </a>
          <a href="#" className="social-link-card" aria-label="Facebook">
            <FacebookIcon className="social-icon" />
            <span className="social-text">Add me on Facebook</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
