import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './ProjectModal.scss' // reuse same modal styles

/* ── inline icons ── */
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)
const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
)

export default function CertModal({ cert, onClose }) {
    const overlayRef = useRef(null)

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

    // Accent color per cert type
    const accentColor = cert.color || 'var(--accent)'

    return createPortal(
        <div
            className="pm-overlay"
            ref={overlayRef}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${cert.title}`}
        >
            <div className="pm-card" style={{ '--project-color': accentColor }}>

                {/* ── Window chrome ── */}
                <div className="pm-topbar">
                    <div className="pm-dots">
                        <span className="pm-dot pm-dot--red" onClick={onClose} title="Close" />
                        <span className="pm-dot pm-dot--yellow" />
                        <span className="pm-dot pm-dot--green" />
                    </div>
                    <span className="pm-window-title">{cert.title} — Certificate</span>
                    <button className="pm-close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
                </div>

                {/* ── Certificate image viewer ── */}
                <div className="pm-screen pm-cert-screen">
                    <div className="pm-cert-viewer">
                        <img
                            src={cert.image}
                            alt={cert.title}
                            className="pm-cert-img"
                            draggable={false}
                        />
                    </div>
                </div>

                {/* ── Info panel ── */}
                <div className="pm-info">
                    <div className="pm-info-left">
                        <div className="pm-badge-row">
                            {cert.featured && <span className="pm-badge pm-badge--featured">⭐ Featured</span>}
                            <span className={`pm-badge pm-badge--type`}>
                                {cert.type === 'speaker' ? '🎤 Speaker' : '📜 Certificate'}
                            </span>
                            {cert.tags?.map((tag) => (
                                <span key={tag} className="pm-badge">{tag}</span>
                            ))}
                        </div>
                        <h2 className="pm-title">{cert.title}</h2>
                    </div>

                    <div className="pm-actions">
                        <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pm-btn pm-btn--primary"
                        >
                            <ExternalIcon /> {cert.linkText || 'View Certificate'}
                        </a>
                    </div>
                </div>

            </div>
        </div>,
        document.body
    )
}
