import './About.scss'
import { UserIcon } from './Icons'

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <div className="header-top">
            <h2 className="section-title">
              <UserIcon className="section-icon" />
              <span>About Me</span>
            </h2>
            <div className="header-accent" />
          </div>
          <p className="section-subtitle">A short intro and quick facts about me</p>
        </div>

        <div className="about-grid">
          <div className="about-card bio">
            <h3>Bio</h3>
            <p>
              This is a portfolio that was built with React, Vite, and Sass. It is a work in progress, but it is a good example of what I can do.
            </p>
          </div>

          <div className="about-card stats">
            <h3>Quick Stats</h3>
            <ul>
              <li><strong>Projects:</strong> 7</li>
              <li><strong>Years:</strong> 3+ experience</li>
              <li><strong>Location:</strong> Antipolo City, PH</li>
            </ul>
          </div>

          <div className="about-card skills">
            <h3>Skills</h3>
            <p>React, Vite, Sass, Firebase, JavaScript, Accessibility</p>
          </div>

          <div className="about-card interests">
            <h3>Interests</h3>
            <p>Design systems, motion UI, open-source, learning new tech</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
