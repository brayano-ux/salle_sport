import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pricingPlans } from '../data/gym'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
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

  const scrollToContact = (planId: string) => {
    const el = document.querySelector('#contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      // Store selected plan in session storage for the contact form
      sessionStorage.setItem('selectedPlan', planId)
    }
  }

  return (
    <section
      id="pricing"
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
              Abonnements
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
              Nos Tarifs
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
            En FCFA
          </span>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="pricing-card"
              style={{
                border: plan.highlighted ? '2px solid #000000' : '1px solid #e5e5e5',
                backgroundColor: plan.highlighted ? '#000000' : '#ffffff',
                padding: 'clamp(32px, 3vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {plan.highlighted && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '6px 16px',
                    border: '1px solid #000000',
                  }}
                >
                  Le plus populaire
                </span>
              )}

              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: plan.highlighted ? 'rgba(255,255,255,0.7)' : '#666666',
                  marginBottom: '16px',
                }}
              >
                {plan.name}
              </h3>

              <div style={{ marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: 'clamp(36px, 4vw, 56px)',
                    fontWeight: 400,
                    letterSpacing: '-0.03em',
                    color: plan.highlighted ? '#ffffff' : '#000000',
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: plan.highlighted ? 'rgba(255,255,255,0.6)' : '#666666',
                  }}
                >
                  {' '}
                  FCFA{plan.period}
                </span>
              </div>

              <p
                style={{
                  fontSize: '14px',
                  color: plan.highlighted ? 'rgba(255,255,255,0.7)' : '#444444',
                  marginBottom: '32px',
                  paddingBottom: '24px',
                  borderBottom: plan.highlighted
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid #e5e5e5',
                }}
              >
                {plan.description}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: plan.highlighted ? 'rgba(255,255,255,0.85)' : '#444444',
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <span style={{ color: plan.highlighted ? '#ffffff' : '#000000', flexShrink: 0 }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToContact(plan.id)}
                style={{
                  marginTop: '32px',
                  width: '100%',
                  padding: '16px 24px',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: plan.highlighted ? '#000000' : '#ffffff',
                  backgroundColor: plan.highlighted ? '#ffffff' : '#000000',
                  border: plan.highlighted ? 'none' : '1px solid #000000',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  fontFamily: '"Helvetica Neue", sans-serif',
                }}
                onMouseEnter={(e) => {
                  if (plan.highlighted) {
                    e.currentTarget.style.backgroundColor = '#f0f0f0'
                  } else {
                    e.currentTarget.style.backgroundColor = '#333333'
                  }
                }}
                onMouseLeave={(e) => {
                  if (plan.highlighted) {
                    e.currentTarget.style.backgroundColor = '#ffffff'
                  } else {
                    e.currentTarget.style.backgroundColor = '#000000'
                  }
                }}
              >
                Souscrire
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
