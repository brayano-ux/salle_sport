import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

export default function UserProfile() {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/')
    }
  }, [isLoading, isAuthenticated, navigate])

  const { data: mySubscriptions, isLoading: subsLoading } = trpc.subscription.mySubscriptions.useQuery(
    undefined,
    { enabled: isAuthenticated }
  )

  const { data: myMessages, isLoading: msgsLoading } = trpc.contact.myMessages.useQuery(
    undefined,
    { enabled: isAuthenticated }
  )

  if (isLoading) {
    return (
      <div style={{ padding: '120px 40px', textAlign: 'center', fontSize: '15px', color: '#666' }}>
        Chargement...
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div style={{ padding: '120px 40px 60px', maxWidth: '900px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '60px',
          paddingBottom: '32px',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || ''}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '28px',
              fontWeight: 400,
            }}
          >
            {(user.name || 'U')[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              marginBottom: '4px',
            }}
          >
            {user.name || 'Utilisateur'}
          </h1>
          <p style={{ fontSize: '14px', color: '#666' }}>{user.email}</p>
          {user.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              style={{
                marginTop: '8px',
                padding: '6px 14px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Admin →
            </button>
          )}
        </div>
      </div>

      {/* Subscriptions */}
      <div style={{ marginBottom: '60px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            marginBottom: '20px',
          }}
        >
          Mes abonnements
        </h2>
        {subsLoading ? (
          <p style={{ color: '#666' }}>Chargement...</p>
        ) : !mySubscriptions?.length ? (
          <div
            style={{
              padding: '32px',
              border: '1px solid #e5e5e5',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px' }}>
              Vous n'avez pas encore d'abonnement.
            </p>
            <button
              onClick={() => {
                navigate('/')
                setTimeout(() => {
                  document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              style={{
                padding: '12px 24px',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Voir les tarifs
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mySubscriptions.map((sub) => (
              <div
                key={sub.id}
                style={{
                  padding: '20px 24px',
                  border: '1px solid #e5e5e5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>
                    Forfait {sub.planType.charAt(0).toUpperCase() + sub.planType.slice(1)}
                  </p>
                  <p style={{ fontSize: '13px', color: '#666' }}>
                    {new Date(sub.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <StatusBadge status={sub.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <div>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            marginBottom: '20px',
          }}
        >
          Mes messages
        </h2>
        {msgsLoading ? (
          <p style={{ color: '#666' }}>Chargement...</p>
        ) : !myMessages?.length ? (
          <div
            style={{
              padding: '32px',
              border: '1px solid #e5e5e5',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '15px', color: '#666' }}>
              Vous n'avez pas encore envoyé de message.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  padding: '20px 24px',
                  border: '1px solid #e5e5e5',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <p style={{ fontSize: '14px', fontWeight: 500 }}>
                    {msg.subject || 'Message'}
                  </p>
                  <ReadBadge isRead={msg.isRead === 'read'} />
                </div>
                <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.5, marginBottom: '8px' }}>
                  {msg.message}
                </p>
                <p style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#f5f5dc', color: '#8b7355' },
    active: { bg: '#e8f5e9', color: '#2e7d32' },
    cancelled: { bg: '#ffebee', color: '#c62828' },
  }
  const c = colors[status] || colors.pending
  const labels: Record<string, string> = {
    pending: 'En attente',
    active: 'Actif',
    cancelled: 'Annulé',
  }
  return (
    <span
      style={{
        padding: '4px 10px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        backgroundColor: c.bg,
        color: c.color,
      }}
    >
      {labels[status] || status}
    </span>
  )
}

function ReadBadge({ isRead }: { isRead: boolean }) {
  return (
    <span
      style={{
        padding: '4px 10px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        backgroundColor: isRead ? '#e8f5e9' : '#f5f5dc',
        color: isRead ? '#2e7d32' : '#8b7355',
      }}
    >
      {isRead ? 'Lu' : 'Non lu'}
    </span>
  )
}
