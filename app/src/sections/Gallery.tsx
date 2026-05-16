import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryImages } from '../data/gym'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft' && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1)
      if (e.key === 'ArrowRight' && lightboxIndex < galleryImages.length - 1)
        setLightboxIndex(lightboxIndex + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        style={{
          backgroundColor: '#0b0b0b',
          padding: '120px clamp(20px, 4vw, 60px)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '60px',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              paddingBottom: '20px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.24em',
                  color: 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Galerie
              </p>
              <h2
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: '#ffffff',
                }}
              >
                Notre Club
              </h2>
            </div>
            <span
              style={{
                fontSize: '12px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
              }}
            >
              {galleryImages.length} photos
            </span>
          </div>

          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '8px',
            }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={img.id}
                className="gallery-item"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: i === 0 || i === 3 ? '16/10' : i === 2 || i === 4 ? '1/1' : '4/3',
                }}
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '24px',
                      color: '#ffffff',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    className="gallery-zoom-icon"
                  >
                    +
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              fontSize: '32px',
              color: '#ffffff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            ×
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex - 1)
              }}
              style={{
                position: 'absolute',
                left: '24px',
                fontSize: '32px',
                color: '#ffffff',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: 1001,
              }}
            >
              ‹
            </button>
          )}

          {lightboxIndex < galleryImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(lightboxIndex + 1)
              }}
              style={{
                position: 'absolute',
                right: '24px',
                fontSize: '32px',
                color: '#ffffff',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: 1001,
              }}
            >
              ›
            </button>
          )}

          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
        </div>
      )}
    </>
  )
}
