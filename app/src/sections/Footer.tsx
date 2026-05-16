import { useState } from 'react'

const footerLinks = [
  { label: 'À Propos', href: '#about' },
  { label: 'Cours', href: '#classes' },
  { label: 'Planning', href: '#schedule' },
  { label: 'Coachs', href: '#coaches' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Merci pour votre inscription à la newsletter !')
    setNewsletterEmail('')
  }

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#0b0b0b',
        color: '#ffffff',
        padding: '80px clamp(20px, 4vw, 60px) 40px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '60px',
            paddingBottom: '60px',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                marginBottom: '16px',
              }}
            >
              IRONFIT
            </p>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '280px',
              }}
            >
              La salle de sport premium de Douala. Repoussez vos limites dans un
              cadre d'excellence.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Liens rapides
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.map((link) => (
                <li key={link.label} style={{ marginBottom: '10px' }}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: 0,
                      fontFamily: 'inherit',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Contact
            </p>
            <p style={{ fontSize: '14px', lineHeight: 2, color: 'rgba(255,255,255,0.7)' }}>
              contact@ironfitclub.cm
              <br />
              +237 6 90 00 00 00
              <br />
              Douala, Cameroun
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Newsletter
            </p>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '16px',
              }}
            >
              Recevez nos offres et actualités.
            </p>
            <form
              onSubmit={handleNewsletter}
              style={{ display: 'flex', gap: '8px' }}
            >
              <input
                type="email"
                placeholder="Votre email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: '13px',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 18px',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#0b0b0b',
                  backgroundColor: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s ease',
                  fontFamily: '"Helvetica Neue", sans-serif',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e0e0e0'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff'
                }}
              >
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            © 2026 IronFit Club Cameroun. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
              }}
            >
              Facebook
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
              }}
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Giant wordmark */}
        <div
          style={{
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0.85,
            paddingTop: '40px',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(60px, 14vw, 240px)',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              color: 'rgba(255,255,255,0.06)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              textAlign: 'center',
            }}
          >
            IRONFIT
          </span>
        </div>
      </div>
    </footer>
  )
}
