import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { schedule } from '../data/gym'

gsap.registerPlugin(ScrollTrigger)

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeDay, setActiveDay] = useState('Lundi')
  const slots = schedule[activeDay] || []

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.schedule-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="schedule"
      ref={sectionRef}
      style={{
        backgroundColor: '#f4f4f5',
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
              Planning
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
              Horaires Hebdomadaires
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
            6h - 21h
          </span>
        </div>

        {/* Day tabs */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '40px',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              style={{
                padding: '12px 24px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: activeDay === day ? '#000000' : 'transparent',
                color: activeDay === day ? '#ffffff' : '#000000',
                border: '1px solid #000000',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Schedule grid */}
        <div className="schedule-content">
          {slots.length === 0 ? (
            <p style={{ fontSize: '16px', color: '#666666', textAlign: 'center', padding: '60px 0' }}>
              Aucun cours programmé ce jour.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                gap: '1px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #1a1a1a',
              }}
            >
              {slots.map((slot, i) => (
                <div
                  key={`${slot.time}-${i}`}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '24px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff'
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      color: '#666666',
                      fontVariantNumeric: 'tabular-nums',
                      minWidth: '110px',
                    }}
                  >
                    {slot.time}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#000000',
                        marginBottom: '4px',
                      }}
                    >
                      {slot.class}
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#666666',
                      }}
                    >
                      Coach {slot.coach} · {slot.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
