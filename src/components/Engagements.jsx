import './Engagements.scss'
import { BriefcaseIcon, CalendarIcon, MicrophoneIcon, MonitorIcon } from './Icons'

function Engagements() {
  const engagements = [
    {
      title: 'Shopify Admin and Web Builder UI/UX',
      date: 'Current',
      type: 'work',
      icon: MonitorIcon,
      progress: 100
    },
    {
      title: 'Code the laravel way: Guest Speaker',
      date: 'November 2025',
      type: 'event',
      icon: MicrophoneIcon,
      progress: 0
    },
    {
      title: 'Freelancing',
      date: 'September 2023',
      type: 'work',
      icon: BriefcaseIcon,
      progress: 100
    },
    {
      title: 'Hello World!',
      date: 'August 2022',
      type: 'milestone',
      icon: CalendarIcon,
      progress: 100
    }
  ]

  return (
    <section id="engagements" className="engagements">
      <h2 className="section-title">
        <BriefcaseIcon className="section-icon" />
        <span>Engagements</span>
      </h2>
      <div className="engagements-list">
        {engagements.map((engagement, index) => {
          const IconComponent = engagement.icon
          const isCurrent = engagement.date === 'Current'
          return (
            <div key={index} className="engagement-item">
              <div className="engagement-marker">
                <IconComponent className="marker-icon" />
              </div>
              <div className="engagement-content">
                <div className="engagement-header">
                  <h3 className="engagement-title">{engagement.title}</h3>
                  <span className={`engagement-date ${isCurrent ? 'current' : ''}`}>{engagement.date}</span>
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
