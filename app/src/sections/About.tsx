import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gymStats } from '../data/gym'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })
      gsap.from(imageRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })
      gsap.from(statsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        padding: '120px clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          <div ref={textRef}>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#666666',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              À Propos
            </p>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#000000',
                marginBottom: '24px',
              }}
            >
              L'excellence du fitness
              <br />
              à Douala
            </h2>
            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#444444',
                maxWidth: '540px',
                marginBottom: '20px',
              }}
            >
              IronFit Club Cameroun est une salle de sport haut de gamme située au
              cœur de Douala. Avec <strong>1000 m²</strong> d'espace entièrement
              dédié au fitness, nous proposons des équipements de dernière
              génération, des coachs diplômés d'État et une ambiance motivante
              pour vous accompagner dans l'atteinte de vos objectifs.
            </p>
            <p
              style={{
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#444444',
                maxWidth: '540px',
              }}
            >
              Que vous soyez débutant ou athlète confirmé, nos programmes
              personnalisés et nos cours collectifs variés sauront répondre à
              vos besoins. Rejoignez une communauté passionnée et repoussez vos
              limites dans un cadre premium.
            </p>
          </div>

          <div ref={imageRef} style={{ position: 'relative' }}>
            <img
              src="/images/about-gym.jpg"
              alt="Intérieur de la salle IronFit"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '16/10',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '40px',
            marginTop: '80px',
            paddingTop: '60px',
            borderTop: '1px solid #e5e5e5',
          }}
        >
          {gymStats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: 'clamp(48px, 5vw, 72px)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: '#000000',
                  lineHeight: 1,
                }}
              >
                {stat.value}
                <span style={{ fontSize: '24px', color: '#666666' }}>{stat.unit}</span>
              </p>
              <p
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.14em',
                  color: '#666666',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
