import './Engagements.scss'
import { BriefcaseIcon, CalendarIcon, MicrophoneIcon, MonitorIcon } from './Icons'

function Engagements() {
  const engagements = [
    {
      title: 'Shopify Admin Assistant & Web Builder',
      date: 'Current',
      type: 'work',
      icon: MonitorIcon,
      description: 'Building intuitive e-commerce interfaces'
    },
    {
      title: 'Code the Laravel Way: Guest Speaker',
      date: 'Nov 2025',
      type: 'event',
      icon: MicrophoneIcon,
      description: 'Sharing Laravel best practices'
    },
    {
      title: 'Freelance Development',
      date: 'Sep 2023',
      type: 'work',
      icon: BriefcaseIcon,
      description: 'Independent web development projects'
    },
    {
      title: 'Hello World!',
      date: 'Aug 2022',
      type: 'milestone',
      icon: CalendarIcon,
      description: 'Started development journey'
    }
  ]

  return (
    <section id="engagements" className="engagements">
      <h2 className="section-title">
        <BriefcaseIcon className="section-icon" />
        <span>Engagements</span>
      </h2>
      <div className="timeline">
        {engagements.map((engagement, index) => {
          const IconComponent = engagement.icon
          const isCurrent = engagement.date === 'Current'
          const isLast = index === engagements.length - 1
          
          return (
            <div key={index} className={`timeline-item ${isCurrent ? 'active' : ''}`}>
              <div className="timeline-marker">
                <div className="marker-outer">
                  <IconComponent className="marker-icon" />
                </div>
                {!isLast && <div className="timeline-line" />}
              </div>
              
              <div className="timeline-content">
                <div className="content-card">
                  <div className="card-header">
                    <h3 className="engagement-title">{engagement.title}</h3>
                    <span className={`engagement-date ${isCurrent ? 'current' : ''}`}>
                      {engagement.date}
                    </span>
                  </div>
                  <p className="engagement-description">{engagement.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Engagements