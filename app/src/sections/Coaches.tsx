import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coaches } from '../data/gym'

gsap.registerPlugin(ScrollTrigger)

export default function Coaches() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.coach-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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

  return (
    <section
      id="coaches"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
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
            borderBottom: '1px solid #1a1a1a',
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
                color: '#666666',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Équipe
            </p>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#000000',
              }}
            >
              Nos Coachs
            </h2>
          </div>
          <span
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: '#666666',
              textTransform: 'uppercase',
            }}
          >
            Experts certifiés
          </span>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '32px',
          }}
        >
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="coach-card"
              style={{
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  overflow: 'hidden',
                  marginBottom: '20px',
                }}
              >
                <img
                  src={coach.image}
                  alt={coach.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#000000',
                  letterSpacing: '-0.01em',
                  marginBottom: '6px',
                }}
              >
                {coach.name}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  color: '#666666',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                {coach.specialty}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.55,
                  color: '#444444',
                }}
              >
                {coach.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
