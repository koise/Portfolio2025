import './Skills.scss'
import { CodeIcon, SettingsIcon, DatabaseIcon, ToolIcon, getTechIcon } from './Icons'

function Skills() {
  const techStack = [
    {
      title: 'Languages',
      icon: CodeIcon,
      skills: ['C', 'C++', 'C#', 'Asp.Net', 'PHP', 'JS', 'HTML', 'CSS', 'Python']
    },
    {
      title: 'Frameworks',
      icon: SettingsIcon,
      skills: ['Laravel', 'React native', 'Liquid (Shopify)']
    },
    {
      title: 'Database',
      icon: DatabaseIcon,
      skills: ['Mysql', 'Postgres', 'Firebase']
    },
    {
      title: 'Tools',
      icon: ToolIcon,
      skills: ['Node', 'Github', 'VsCode', 'Visual Studio 2019', 'Mapbox', 'Discord', 'Postman', 'Git', 'Ms Teams', 'Pycharm', 'Android Studio', 'Oracle Virtual Box', 'Composer']
    }
  ]

  return (
    <section id="skills" className="skills">
      <h2 className="section-title">
        <CodeIcon className="section-icon" />
        <span>Tech Stack</span>
      </h2>
      <div className="tech-stack">
        {techStack.map((category, index) => {
          const IconComponent = category.icon
          return (
            <div key={index} className="tech-category">
              <h3 className="tech-category-title">
                <IconComponent className="category-icon" />
                <span>{category.title}</span>
              </h3>
              <div className="tech-tags">
                {category.skills.map((skill, skillIndex) => {
                  const TechIconComponent = getTechIcon(skill)
                  return (
                    <span key={skillIndex} className="tech-tag">
                      <TechIconComponent className="tech-icon" />
                      <span className="tech-name">{skill}</span>
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Skills
