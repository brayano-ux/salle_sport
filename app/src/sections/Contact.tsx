import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }))
    }
  }, [user])

  const createContact = trpc.contact.create.useMutation({
    onSuccess: () => {
      setSubmitted(true)
      setSubmitError(null)
    },
    onError: (err) => {
      setSubmitError(err.message || 'Une erreur est survenue.')
    },
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!formData.fullName || !formData.email || !formData.message) {
      setSubmitError('Veuillez remplir tous les champs obligatoires.')
      return
    }

    createContact.mutate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.subject || undefined,
      message: formData.message,
      userId: user?.id,
    })
  }

  const fieldBase: React.CSSProperties = {
    width: '100%',
    padding: '14px 0',
    fontSize: '15px',
    backgroundColor: 'transparent',
    color: '#000000',
    border: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
    outline: 'none',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
  }

  const labelBase: React.CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.2em',
    color: '#666666',
    textTransform: 'uppercase',
    marginBottom: '4px',
    display: 'block',
  }

  return (
    <section
      id="contact"
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
              Contact
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
              Rejoignez-nous
            </h2>
          </div>
        </div>

        <div
          ref={formRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '60px',
          }}
        >
          {/* Left: Form */}
          <div>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#444444',
                marginBottom: '32px',
              }}
            >
              Remplissez le formulaire ci-dessous et notre équipe vous contactera
              dans les plus brefs délais pour finaliser votre inscription ou
              répondre à vos questions.
            </p>

            {submitted ? (
              <div
                style={{
                  border: '1px solid rgba(0,0,0,0.4)',
                  padding: '32px 28px',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: '#000000',
                }}
              >
                Merci pour votre message ! Notre équipe vous contactera dans les
                24 heures. À très bientôt chez IronFit !
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {submitError && (
                  <div
                    style={{
                      border: '1px solid rgba(200,50,50,0.5)',
                      padding: '14px 18px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      color: 'rgba(180,50,50,0.9)',
                    }}
                  >
                    {submitError}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <label style={{ display: 'block' }}>
                    <span style={labelBase}>Nom *</span>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Votre nom"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={fieldBase}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#000000')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.2)')}
                    />
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={labelBase}>Email *</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={fieldBase}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#000000')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.2)')}
                    />
                  </label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <label style={{ display: 'block' }}>
                    <span style={labelBase}>Téléphone</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+237 6 XX XX XX XX"
                      value={formData.phone}
                      onChange={handleChange}
                      style={fieldBase}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#000000')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.2)')}
                    />
                  </label>
                  <label style={{ display: 'block' }}>
                    <span style={labelBase}>Sujet</span>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Abonnement, question..."
                      value={formData.subject}
                      onChange={handleChange}
                      style={fieldBase}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#000000')}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.2)')}
                    />
                  </label>
                </div>
                <label style={{ display: 'block' }}>
                  <span style={labelBase}>Message *</span>
                  <textarea
                    name="message"
                    placeholder="Votre message..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    style={{ ...fieldBase, resize: 'vertical', paddingTop: '12px' }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#000000')}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(0,0,0,0.2)')}
                  />
                </label>
                <button
                  type="submit"
                  disabled={createContact.isPending}
                  style={{
                    marginTop: '12px',
                    padding: '18px 24px',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    border: '1px solid #000000',
                    cursor: createContact.isPending ? 'wait' : 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.25s ease',
                    fontFamily: '"Helvetica Neue", sans-serif',
                    opacity: createContact.isPending ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333333'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000'
                  }}
                >
                  {createContact.isPending ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            )}
          </div>

          {/* Right: Info + Map */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#000000',
                  marginBottom: '20px',
                }}
              >
                Nos coordonnées
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Adresse
                  </p>
                  <p style={{ fontSize: '15px', color: '#000000', lineHeight: 1.6 }}>
                    Boulevard de la République, Bonanjo<br />
                    Douala, Cameroun
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Téléphone
                  </p>
                  <p style={{ fontSize: '15px', color: '#000000' }}>
                    +237 6 90 00 00 00
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Email
                  </p>
                  <p style={{ fontSize: '15px', color: '#000000' }}>
                    contact@ironfitclub.cm
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666666', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Horaires
                  </p>
                  <p style={{ fontSize: '15px', color: '#000000', lineHeight: 1.6 }}>
                    Lun - Ven : 6h - 22h<br />
                    Sam : 8h - 18h<br />
                    Dim : 9h - 18h
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666666', textTransform: 'uppercase', marginBottom: '12px' }}>
                Suivez-nous
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontSize: '13px',
                    color: '#000000',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Facebook
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontSize: '13px',
                    color: '#000000',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div style={{ width: '100%', height: '300px', border: '1px solid #e5e5e5' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d9.7679!3d4.0511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDMnMDQuMCJOIDnCsDQ2JzA0LjQiRQ!5e0!3m2!1sfr!2scm!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IronFit Club Douala"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
