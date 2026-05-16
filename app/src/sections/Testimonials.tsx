import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../data/gym'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-content', {
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

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [goNext])

  const current = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        backgroundColor: '#0b0b0b',
        padding: '120px clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Témoignages
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
            Ils nous font confiance
          </h2>
        </div>

        <div className="testimonial-content" style={{ position: 'relative' }}>
          {/* Testimonial card */}
          <div
            style={{
              textAlign: 'center',
              padding: '0 clamp(20px, 4vw, 60px)',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Stars */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '24px',
                justifyContent: 'center',
              }}
            >
              {Array.from({ length: current.rating }).map((_, i) => (
                <span key={i} style={{ fontSize: '18px', color: '#ffffff' }}>
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p
              style={{
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '760px',
                marginBottom: '32px',
                fontStyle: 'italic',
              }}
            >
              "{current.text}"
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={current.avatar}
                alt={current.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              />
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                }}
              >
                {current.name}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            style={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              fontSize: '20px',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            ‹
          </button>
          <button
            onClick={goNext}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              fontSize: '20px',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '40px',
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: i === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'background-color 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
