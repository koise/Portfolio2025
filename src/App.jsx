import ThemeProvider from './context/ThemeContext'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Engagements from './components/Engagements'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import FloatingActionBar from './components/FloatingActionBar'
import './App.scss'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <main>
          <Hero />
          <div className="main-content">
            <div className="left-column">
              <Skills />
            </div>
            <div className="right-column">
              <Engagements />
              <Contact />
            </div>
          </div>
          <Projects />
          <Certifications />
        </main>
        <FloatingActionBar />
      </div>
    </ThemeProvider>
  )
}

export default App

