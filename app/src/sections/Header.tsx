import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
}

const navItems = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Cours', href: '#classes' },
  { label: 'Planning', href: '#schedule' },
  { label: 'Coachs', href: '#coaches' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL
  const appID = import.meta.env.VITE_APP_ID
  const redirectUri = `${window.location.origin}/api/oauth/callback`
  const state = btoa(redirectUri)

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`)
  url.searchParams.set('client_id', appID)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'profile')
  url.searchParams.set('state', state)

  return url.toString()
}

export default function Header({ scrollRef }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const rafRef = useRef<number>(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 100)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  const overHero = overHeroRaw
  const { user, isAuthenticated, logout } = useAuth({ redirectPath: '/' })

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const textColor = overHero ? '#ffffff' : '#000000'
  const bgColor = overHero ? 'transparent' : '#ffffff'
  const borderColor = overHero ? 'rgba(255,255,255,0.18)' : '#000000'

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: isCompact ? '64px' : '88px',
        backgroundColor: menuOpen ? '#ffffff' : bgColor,
        borderBottom: menuOpen
          ? '1px solid #000000'
          : `1px solid ${borderColor}`,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        transition:
          'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        style={{
          fontSize: '18px',
          fontWeight: 500,
          letterSpacing: '0.22em',
          cursor: 'pointer',
          color: menuOpen ? '#000000' : textColor,
          transition: 'color 0.4s ease',
        }}
        onClick={() => handleNavClick('#hero')}
      >
        IRONFIT
      </div>

      {/* Desktop nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'stretch',
          height: '100%',
        }}
        className="desktop-nav"
      >
        {navItems.slice(0, 5).map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            overHero={overHero}
            onClick={() => handleNavClick(item.href)}
          />
        ))}
        {isAuthenticated && user ? (
          <NavItem
            label="Déconnexion"
            overHero={overHero}
            onClick={logout}
          />
        ) : (
          <NavItem
            label="Connexion"
            overHero={overHero}
            onClick={() => {
              window.location.href = getOAuthUrl()
            }}
          />
        )}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="mobile-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          flexDirection: 'column',
          gap: '5px',
          zIndex: 101,
        }}
      >
        <span
          style={{
            width: '24px',
            height: '2px',
            backgroundColor: menuOpen ? '#000000' : textColor,
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }}
        />
        <span
          style={{
            width: '24px',
            height: '2px',
            backgroundColor: menuOpen ? '#000000' : textColor,
            transition: 'all 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            width: '24px',
            height: '2px',
            backgroundColor: menuOpen ? '#000000' : textColor,
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: isCompact ? '64px' : '88px',
            left: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #000000',
            padding: '20px clamp(20px, 4vw, 60px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            zIndex: 99,
            maxHeight: 'calc(100vh - 88px)',
            overflowY: 'auto',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              style={{
                padding: '14px 0',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: '#000000',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #e5e5e5',
                cursor: 'pointer',
                textAlign: 'left',
                textTransform: 'uppercase',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              {item.label}
            </button>
          ))}
          {isAuthenticated && user ? (
            <button
              onClick={() => {
                setMenuOpen(false)
                logout()
              }}
              style={{
                padding: '14px 0',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: '#000000',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                textTransform: 'uppercase',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              Déconnexion ({user.name})
            </button>
          ) : (
            <button
              onClick={() => {
                window.location.href = getOAuthUrl()
              }}
              style={{
                padding: '14px 0',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: '#000000',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                textTransform: 'uppercase',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              Connexion
            </button>
          )}
        </div>
      )}
    </header>
  )
}

function NavItem({
  label,
  overHero,
  onClick,
}: {
  label: string
  overHero: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = overHero ? '#ffffff' : '#000000'
  const hoverBg = overHero ? '#ffffff' : '#000000'
  const hoverFg = overHero ? '#000000' : '#ffffff'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        fontSize: '12px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: hovered ? hoverFg : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: '"Helvetica Neue", sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}
