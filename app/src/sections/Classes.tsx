import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gymClasses } from '../data/gym'

gsap.registerPlugin(ScrollTrigger)

export default function Classes() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.class-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
      id="classes"
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
              Programme
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
              Nos Cours
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
            6 disciplines
          </span>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '24px',
          }}
        >
          {gymClasses.map((gymClass) => (
            <div
              key={gymClass.id}
              className="class-card"
              style={{
                backgroundColor: '#141414',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={gymClass.image}
                  alt={gymClass.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {gymClass.duration}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {gymClass.level}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 500,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    marginBottom: '8px',
                  }}
                >
                  {gymClass.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '16px',
                  }}
                >
                  {gymClass.description}
                </p>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255,255,255,0.3)',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff'
                    e.currentTarget.style.color = '#0b0b0b'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                >
                  Je réserve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
