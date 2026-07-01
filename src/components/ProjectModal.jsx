import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './ProjectModal.scss'

/* ─── small inline icons ─────────────────────────────── */
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)
const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
)
const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
)
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
)

const PROJECT_META = {
    1: { demoType: 'mockup', mockupNote: 'Live Shopify storefront — Australia-based food importer & distributor', github: null, live: 'https://royalglobalfood.com.au' },
    2: { demoType: 'mockup', mockupNote: 'Live demo coming soon — gamified quiz & coding arena', github: 'https://github.com/koise', live: null },
    3: { demoType: 'mockup', mockupNote: 'Interactive learning platform for special learners — React & Firebase', github: 'https://github.com/koise', live: null },
    4: { demoType: 'mockup', mockupNote: 'Online bakery ordering system — demo in private repo', github: 'https://github.com/koise', live: null },
    5: { demoType: 'mockup', mockupNote: 'Smart navigation & SOS app — APK available on request', github: 'https://github.com/koise', live: null },
    6: { demoType: 'mockup', mockupNote: 'Dental clinic management — private client project', github: null, live: null },
    7: { demoType: 'mockup', mockupNote: 'Security & surveillance system — demo on request', github: 'https://github.com/koise', live: null },
    8: { demoType: 'mockup', mockupNote: 'HRIS for Clark Development Center — internal system', github: null, live: null },
    9: { demoType: 'mockup', mockupNote: 'Job portal for CDC — deployed internally', github: null, live: null },
    10: { demoType: 'mockup', mockupNote: 'PYDI Management System for NYC — government internal', github: null, live: null },
    11: { demoType: 'mockup', mockupNote: 'NDC landing page mockup — Wordpress + Mapbox', github: null, live: null },
}

export default function ProjectModal({ project, onClose }) {
    const overlayRef = useRef(null)
    const meta = PROJECT_META[project.id] || { demoType: 'mockup', mockupNote: 'Demo coming soon.' }

    const handleKey = useCallback((e) => { if (e.key === 'Escape') onClose() }, [onClose])
    useEffect(() => {
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [handleKey])

    const handleOverlayClick = (e) => { if (e.target === overlayRef.current) onClose() }

    return createPortal(
        <div className="pm-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label={`Demo for ${project.title}`}>
            <div className="pm-card" style={{ '--project-color': project.color }}>

                {/* ── Window chrome bar ── */}
                <div className="pm-topbar">
                    <div className="pm-dots">
                        <span className="pm-dot pm-dot--red" onClick={onClose} title="Close" />
                        <span className="pm-dot pm-dot--yellow" />
                        <span className="pm-dot pm-dot--green" />
                    </div>
                    <span className="pm-window-title">{project.title} — Demo Preview</span>
                    <button className="pm-close" onClick={onClose} aria-label="Close modal"><CloseIcon /></button>
                </div>

                {/* ── Demo screen ── */}
                <div className="pm-screen">
                    {meta.demoType === 'youtube' ? (
                        <div className="pm-video-wrap">
                            <iframe
                                src={`https://www.youtube.com/embed/${meta.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                                title={`${project.title} demo`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="pm-iframe"
                            />
                        </div>
                    ) : (
                        <div className="pm-mockup">
                            <div className="pm-browser">
                                <div className="pm-browser-bar">
                                    <div className="pm-browser-dots">
                                        <span /><span /><span />
                                    </div>
                                    <div className="pm-url-bar">
                                        <span className="pm-url-lock">🔒</span>
                                        <span className="pm-url-text">localhost:5173/{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                                    </div>
                                    <div className="pm-browser-actions">
                                        <span>⋮</span>
                                    </div>
                                </div>
                                <div className="pm-browser-content">
                                    <img
                                        src={project.image}
                                        alt={`${project.title} screenshot`}
                                        className="pm-screenshot"
                                        draggable={false}
                                    />
                                    <div className="pm-screenshot-overlay">
                                        <div className="pm-play-badge">
                                            <PlayIcon />
                                        </div>
                                        <p className="pm-mockup-note">{meta.mockupNote}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Info panel ── */}
                <div className="pm-info">
                    <div className="pm-info-left">
                        <div className="pm-badge-row">
                            {project.featured && <span className="pm-badge pm-badge--featured">⭐ Featured</span>}
                            {project.technologies.map((t) => (
                                <span key={t} className="pm-badge">{t}</span>
                            ))}
                        </div>
                        <h2 className="pm-title">{project.title}</h2>
                        <p className="pm-desc">{project.description}</p>
                    </div>

                    <div className="pm-actions">
                        {meta.github && (
                            <a href={meta.github} target="_blank" rel="noopener noreferrer" className="pm-btn pm-btn--ghost">
                                <GithubIcon /> View Code
                            </a>
                        )}
                        {meta.live && (
                            <a href={meta.live} target="_blank" rel="noopener noreferrer" className="pm-btn pm-btn--primary">
                                <ExternalIcon /> Live Site
                            </a>
                        )}
                        {!meta.github && !meta.live && (
                            <span className="pm-private-note">🔒 Private / Internal Project</span>
                        )}
                    </div>
                </div>

            </div>
        </div>,
        document.body
    )
}